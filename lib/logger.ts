import * as log from 'log';

const minLogLevel: log.LevelName = 'INFO';
console.log('configuring logger')
log.setup({
  handlers: {
    default: new log.handlers.ConsoleHandler(minLogLevel, {
      useColors: false,
    }),
  },
});

export const logger = log;
