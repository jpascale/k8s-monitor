import { TaskCounter } from '../types';
import { intervalToMs } from './interval_to_ms';
import moment = require('moment');

export const updateTaskCounterNext = (task: TaskCounter) => {
  task.next = moment().add(intervalToMs(task.interval), 'ms');
}