import * as async from 'async';
import logging from './logging';
import * as config from './config';

logging.info('Starting k8s monitor');

// Load config
logging.info('Loading config');
const loadedConfig = config.loadConfig(process.argv);
logging.info('Config loaded');


// Start readiness and liveness, respond liveness, not readiness
let ready = false;


// Load tasks
// Load alerts
// Start responding readiness
// Start tasks loop