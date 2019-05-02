import { Alert } from '../types';
const request = require('request');
import logging from '../logging';

export interface Params {
  hook: string;
  name: string;
  subname: string;
}

const getOptions = (hook: string, text: string) => {
  return {
    url: hook,
    method: 'POST',
    body: JSON.stringify({
      text
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}

export class SlackAlert implements Alert {
  public execute(params: Params, cb: (result: boolean) => any) {
    const options = getOptions(params.hook, `Downtime alert: Server ${params.name} (${params.subname}) is DOWN.`);
    request(options, (error: any, response: any) => {
      if (!error && response.statusCode < 300) {
        cb(true);
      } else {
        cb(false);
      }
    });
  };

  public restablish(params: Params, cb: (result: boolean) => any) {
    const options = getOptions(params.hook, `Downtime alert: Server ${params.name} (${params.subname}) is UP again.`);
    request(options, (error: any, response: any) => {
      if (!error && response.statusCode < 300) {
        cb(true);
      } else {
        cb(false);
      }
    });
  }

}