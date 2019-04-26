const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }: { level: string, message: string, label: string, timestamp: any }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

export default logger