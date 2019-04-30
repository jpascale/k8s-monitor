import { SlackAlert } from './slack_alert';

// TODO: Merge with plugins dir
export const ALERT_MAP = {
  slack: new SlackAlert()
}