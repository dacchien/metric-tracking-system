import winston from 'winston'

import { LoggerLevel } from '../constants'

const myWinstonOptions = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.ms(),
    winston.format.printf((info) => {
      return `[${process.env.APP_NAME}] [${info.timestamp}] ${info.message} - {} ${info.ms}`
    }),
    winston.format.colorize({
      all: true,
      colors: {
        [LoggerLevel.Error]: 'red',
        [LoggerLevel.Warn]: 'yellow',
        [LoggerLevel.Info]: 'cyan',
        [LoggerLevel.Debug]: 'green',
      },
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'tmp/error.log', level: 'error' }),
  ],
}

export const Logger = winston.createLogger(myWinstonOptions)
