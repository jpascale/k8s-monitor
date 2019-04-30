import { Config, Item, TaskConfig, AlertConfig, TaskCounter, AlertCounter } from '../types';
import { TASK_MAP } from '../tasks';
import { ALERT_MAP } from '../alerts';
import logging from '../logging';
import moment = require('moment');

export type TaskCounterGenerator = (config: Config) => TaskCounter[];

export const generateTaskCounters: TaskCounterGenerator = (config: Config) => {
  logging.info('Generating task counter');

  const taskList: TaskCounter[] = [];
  config.config.forEach((item: Item) => {
    logging.info(`Setting up ${item.name} monitor`);

    // Generate alerts for these tasks
    const alertList: AlertCounter[] = [];
    item.alerts.forEach((alert: AlertConfig) => {
      logging.info(`Setting up ${alert.type} alert`);
      if (!ALERT_MAP[alert.type]) {
        logging.warn(`Alert ${alert.type} does not exist, ignoring...`);
        return;
      }

      alertList.push({
        type: alert.type,
        params: alert.params
      });
    });

    const alertNamesStr: string = '[' + alertList.map((e: AlertCounter) => e.type).join(', ') + ']';

    item.tasks.forEach((task: TaskConfig) => {
      logging.info(`Setting up ${task.name} task of type ${task.type} with alerts ${alertNamesStr}`);
      const taskCounter: TaskCounter = {
        name: item.name,
        subname: task.name,
        type: task.type,
        params: task.params,
        interval: task.interval,
        up: true,
        failureCount: 0,
        alerts: alertList,
        next: moment()
      };

      if (!TASK_MAP[taskCounter.type]) {
        logging.warn(`Task ${task.type} does not exist, ignoring...`);
        return;
      }

      taskList.push(taskCounter);
    });

  });
  return taskList;
}