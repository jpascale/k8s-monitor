import * as async from 'async';
import logging from './logging';
import * as config from './config';
const path = require('path');

logging.info('Starting k8s monitor');

if (process.argv.length <= 2) {
  logging.error('No config file provided');
  process.exit(1);
}
const configFilePath = path.resolve('.', process.argv[2]);

// Load config
logging.info('Loading config');
const loadedConfig = config.loadConfig(configFilePath);
logging.info('Config loaded ' + JSON.stringify(loadedConfig));

// Start readiness and liveness, respond liveness, not readiness
let ready = false;


// Load tasks
// Load alerts
// Start responding readiness
// Start tasks loop