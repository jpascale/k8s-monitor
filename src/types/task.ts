import { Alert } from './alert';

export interface Task {
  type: string;
  alerts: Alert[]
}