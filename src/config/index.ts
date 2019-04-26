import logging from '../logging';

export const loadConfig = (argv: string[]) => {
  if (argv.length <= 2) {
    logging.error('No config file provided');
    process.exit(1);
  }
  const path = argv[2];
  try {
    return require(path);
  } catch (e) {
    logging.error('Error while loading config');
    logging.error(e);
  }
}