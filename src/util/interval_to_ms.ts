import logging from '../logging';

const intervalMultiplier: { [k: string]: number } = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000
}

export const intervalToMs = (interval: string) => {
  const id = interval[interval.length - 1];
  if (!intervalMultiplier[id]) {
    logging.error(`Received non valid interval ${interval}`);
    process.exit(1);
  }

  const time = interval.substring(0, interval.length - 1);
  try {
    const parsedTime = parseInt(time);
    return parsedTime * intervalMultiplier[id];
  } catch (e) {
    logging.error(`Received non valid interval ${interval}`);
    process.exit(1);
  }
}