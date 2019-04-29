import logging from '../logging';
import express = require('express');
logging.info('Loading stats');

let ready = false;

export const setReadiness = (state: boolean) => {
  ready = state;
  logging.info(`Readiness set to ${ready}`);
}

const app: express.Application = express();

app.get('/readiness', function (req, res) {
  return ready ? res.status(200).json({ status: 'OK' }) : res.status(503).json({ status: 'NOT_READY' });
});

app.get('/liveness', function (req, res) {
  return res.status(200).json({ status: 'OK' });
});

// TODO: config port
app.listen(3000, function () {
  logging.info('Start started on port 3000');
});