import { Task } from '../types/task';
import logging from '../logging';
const request = require('request');
logging.info('Loading http task');


export interface Params {
  hostname: string,
  port: number;
  path: string;
}

export class HttpTask implements Task {
  public execute(params: Params, cb: (result: boolean) => any) {

    const options = {
      url: `http://${params.hostname}:${params.port}${params.path}`,
      headers: {
        'User-Agent': 'request'
      }
    };

    request(options, (error: any, response: any) => {
      if (!error && response.statusCode < 300) {
        cb(true);
      } else {
        cb(false);
      }
    });
  };
}