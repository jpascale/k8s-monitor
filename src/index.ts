import * as async from 'async';
import logging from './logging';
import * as config from './config';
import * as stats from './stats';
import { Config, TaskCounter } from './types';
import { generateTaskCounters, updateTaskCounterNext, processTask } from './util';
const path = require('path');

logging.info('Starting k8s monitor');

if (process.argv.length <= 2) {
  logging.error('No config file provided');
  process.exit(1);
}
const configFilePath = path.resolve('.', process.argv[2]);

// Load config
logging.info('Loading config');
const loadedConfig: Config = config.loadConfig(configFilePath);
logging.info('Config loaded ' + JSON.stringify(loadedConfig));

// Start readiness and liveness, respond liveness, not readiness
logging.info('Starting stats server');
stats.setReadiness(false);
logging.info('Stats server started, server not ready');

// Load task info and alert info list
const taskList = generateTaskCounters(loadedConfig);

// TODO: Check accepted params;

// Set up timestamps
taskList.forEach(updateTaskCounterNext);

// Respond to readiness
stats.setReadiness(true);
logging.info('Server is ready');

let events: { stop: boolean, eventNum: number } = { stop: false, eventNum: 0 };

// Handle SIGTERM
process.on('SIGTERM', () => {
  stats.setReadiness(false);
  logging.info('SIGTERM received');
  events.eventNum = 1;
  events.stop = true;
});

const loop = (next: async.ErrorCallback<Error>) => {
  // Iterate over tasks
  async.each(taskList, processTask, (err) => {
    if (err) {
      logging.error(`Error ocurred while iterating over tasks list`);
      logging.error(err.message);
    }
    // TODO: Iterate over current alerts

    //TODO: Refactor this
    if (events.stop) {
      switch (events.eventNum) {
        case 1:
          return next(new Error('SIGTERM received, grafully shutting down'))
      }
    } else {
      next();
    }
  });

};
// Start tasks loop
async.forever(loop, (err?: Error) => {
  logging.info('Loop ended');
  if (err) {
    logging.warn(err.message);
    logging.info('Bye');
    process.exit(0);
  }
});