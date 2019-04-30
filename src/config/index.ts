import logging from '../logging';
import { Config } from '../types';

export const loadConfig: (path: string) => Config = (path: string) => {
  try {
    return require(path);
  } catch (e) {
    logging.error('Error while loading config');
    logging.error(e);
    process.exit(1);
  }
}