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

const loop = (next: async.ErrorCallback<Error>) => {
  // Iterate over tasks
  async.each(taskList, processTask, (err) => {
    if (err) {
      logging.error(`Error ocurred while iterating over tasks list`);
      logging.error(err.message);
    }
    // TODO: Iterate over current alerts
    next();
  });

};
// Start tasks loop
async.forever(loop, (err?: Error) => {
  logging.info('Forever callback called');
  if (err) {
    logging.warn('Error ocurred while looping over the task list');
    logging.warn(err.message);
    process.exit(1);
  }
});