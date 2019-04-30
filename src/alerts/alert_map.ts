import { SlackAlert } from './slack_alert';
import { Alert } from '../types';

// TODO: Merge with plugins dir
export const ALERT_MAP: { [k: string]: Alert } = {
  slack: new SlackAlert()
}