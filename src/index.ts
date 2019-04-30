import * as async from 'async';
import logging from './logging';
import * as config from './config';
import * as stats from './stats';
import { Config } from './types/config';
import { TASK_MAP } from './tasks';

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

const loop = (next: async.ErrorCallback<Error>) => {
  next();
};

// Load task lists
// Load alerts lists
// Start responding readiness

// Start tasks loop
async.forever(loop, (err?: Error) => {
  logging.info('Forever callback called');
  if (err) {
    logging.warn('Error ocurred while looping over the task list');
    logging.warn(err.message);
    process.exit(1);
  }
});