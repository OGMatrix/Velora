import {LoggerAdapter} from "./LoggerAdapter";
import {format, createLogger, transports} from "winston";
const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, label, printf, colorize, align} = format;
//const config = require('../../config/config');

export class WinstonLoggerAdapter extends LoggerAdapter {
    private _logger: any;

    constructor(label_name: string, log_level?: string){
        super();
        // const console_log_level = log_level || config.logger.console_log_level;
        // const file_log_level = log_level || config.logger.file_log_level;
        const console_log_level = log_level;
        const file_log_level = log_level;
        const myFormat = printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });
        this._logger = createLogger({
            format: combine(
                label({ label: label_name }),
                timestamp(),
                align(),
                myFormat
            ),
            transports: [
                new transports.Console({
                    level: console_log_level,
                    format: combine(
                        colorize({all: true}),
                        label({ label: label_name }),
                        timestamp(),
                        align(),
                        myFormat
                    ),
                }),
                new winston.transports.DailyRotateFile({
                    level: 'error',
                    filename: './log/%DATE%-error.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                }),
                new winston.transports.DailyRotateFile({
                    level: file_log_level,
                    filename: './log/%DATE%-combined.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ]
        })
    }

    info(message: any, optionals?: any) {
        this._logger.info(message, optionals);
    }

    error(message: any, optionals?: any) {
        this._logger.error(message, optionals);
    }

    warn(message: any, optionals?: any) {
        this._logger.warn(message, optionals);
    }

    verbose(message: any, optionals?: any) {
        this._logger.verbose(message, optionals);
    }

    debug(message: any, optionals?: any) {
        this._logger.debug(message, optionals);
    }

    silly(message: any, optionals?: any) {
        this._logger.silly(message, optionals);
    }
}
