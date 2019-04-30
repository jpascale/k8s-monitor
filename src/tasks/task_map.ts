import { HttpTask } from './http_task';
import { Task } from '../types/task';

// TODO: Merge with plugins dir
export const TASK_MAP: { [k: string]: Task } = {
  http: new HttpTask()
}