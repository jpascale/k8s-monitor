import logging from '../logging';

export const loadConfig = (path: string) => {
  try {
    return require(path);
  } catch (e) {
    logging.error('Error while loading config');
    logging.error(e);
    process.exit(1);
  }
}