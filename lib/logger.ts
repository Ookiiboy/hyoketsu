import * as log from 'log';

const minLogLevel: log.LevelName = 'INFO';

log.setup({
  handlers: {
    default: new log.handlers.ConsoleHandler(minLogLevel, {
      useColors: false,
    }),
  },
});

export const logger = log;
