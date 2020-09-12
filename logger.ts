import * as _ from 'lodash';
import * as pino from 'pino';

const _loggers = [pino({ level: process.env.LOG_LEVEL })];
const getLoggers = () => {
  return _loggers;
};

export const tagged = async <T>(tags: Record<string, any>, func: () => T) => {
  const loggers = getLoggers();

  try {
    loggers.push(currentLogger().child(tags));

    return await func();
  } finally {
    loggers.pop();
  }
};

const currentLogger = (): pino.Logger => {
  return _.last(getLoggers())!;
};

export const logger = currentLogger;
