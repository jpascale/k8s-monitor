import { TaskCounter, AlertCounter, Alert } from '../types';
import { updateTaskCounterNext } from './update_task_counter_next';
import { TASK_MAP } from '../tasks';
import { ALERT_MAP } from '../alerts';
import { Task } from '../types';
import moment = require('moment');
import logging from '../logging';

// TODO: Configure this for every task;
const TOLERANCE = 3;
const RETRY_MS = 10000;

export const processTask = (taskCounter: TaskCounter, callback: () => any) => {
  const now = moment();
  if (now.isSame(taskCounter.next) || now.isAfter(taskCounter.next)) {
    const task: Task = TASK_MAP[taskCounter.type];
    task.execute(taskCounter.params, (result: boolean) => {
      // Task did respond
      if (result) {
        taskCounter.failureCount = 0;
        logging.debug(`Task ${taskCounter.name} responded`);
        // Check if it's up again;
        if (!taskCounter.up) {
          taskCounter.up = true;
          taskCounter.alerts.forEach((alertCounter: AlertCounter) => {
            const alert: Alert = ALERT_MAP[alertCounter.type];

            // Resend alert until it's received
            alert.restablish(alertCounter.params, (res: boolean) => {
              if (!res) {
                const alertResendInterval = setInterval(() => {
                  alert.restablish(alertCounter.params, (res: boolean) => {
                    if (res) {
                      clearInterval(alertResendInterval);
                    }
                  });
                }, RETRY_MS);
              } else {
                logging.warn(`Restablish alert for ${taskCounter.name} subtask ${taskCounter.subname} correctly triggered`);
              }
            });



          });
        }
        // Task did not respond
      } else {
        logging.debug(`Task ${taskCounter.name} did not respond`);
        taskCounter.failureCount += 1;
        if (taskCounter.failureCount > TOLERANCE && taskCounter.up) {
          taskCounter.up = false;
          taskCounter.alerts.forEach((alertCounter: AlertCounter) => {
            const alert: Alert = ALERT_MAP[alertCounter.type];
            logging.warn(`Triggering alert for task ${taskCounter.name} subtask ${taskCounter.subname}`);

            // Resend alert until it's received
            alert.execute(alertCounter.params, (res: boolean) => {
              if (!res) {
                const alertResendInterval = setInterval(() => {
                  alert.execute(alertCounter.params, (res: boolean) => {
                    if (res) {
                      logging.warn(`Alert for ${taskCounter.name} subtask ${taskCounter.subname} correctly triggered`);
                      clearInterval(alertResendInterval);
                    }
                  });
                }, RETRY_MS);
              } else {
                logging.warn(`Alert for ${taskCounter.name} subtask ${taskCounter.subname} correctly triggered`);
              }
            });

          });
        }
      }
    })
    updateTaskCounterNext(taskCounter);
  }
  callback();
}