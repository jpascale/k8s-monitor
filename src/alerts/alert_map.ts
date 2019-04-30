import { SlackAlert } from './slack_alert';
import { Alert } from '../types/alert';

// TODO: Merge with plugins dir
export const ALERT_MAP: { [k: string]: Alert } = {
  slack: new SlackAlert()
}