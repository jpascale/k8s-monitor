import moment = require('moment');
import { AlertCounter } from './alert_counter';

export interface TaskCounter {
  name: string;
  subname: string;
  type: string;
  up: boolean;
  failureCount: number;
  params: { [k: string]: any };
  next: moment.Moment;
  alerts: AlertCounter[];
  interval: string;
}