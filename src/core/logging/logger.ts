import * as winston from 'winston'
import { Environment } from '../../config/environment'
import { serializeError, ErrorObject, deserializeError } from 'serialize-error';

// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// This method set the current severity based on 
// the current NODE_ENV: show all the log levels 
// if the server was run in development mode; otherwise, 
// if it was run in production, show only info, warn and error messages.
const level = () => {
    const env = Environment.nodeEnv
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'info'
}

// Define different colors for each level. 
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

// Tell winston that you want to link the colors 
// defined above to the severity levels.
winston.addColors(colors)

//Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => {
            let message = `${info.timestamp} ${info.level}: ${info.message}`

            for (const key in Object.keys(info.metadata)) {
                const innerMetaData = info.metadata[key]

                if (isErrorObject(innerMetaData)) {
                    const error = deserializeError(innerMetaData)
                    message += error.stack ? `\n${error.stack}` : `Error: ${error.name} - ${error.message}`
                } else {
                    message += ` ${key}: ${typeof innerMetaData === 'object' ? JSON.stringify(innerMetaData) : innerMetaData}`
                }
            }

            return message;

        },
    ),
)

const isErrorObject = (error: any): boolean => {
    const errorObject = error as ErrorObject
    return errorObject != null
}

// Define which transports the logger must use to print out messages. 
// In this example, we are using three different transports 
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
]

// Create the logger instance that has to be exported 
// and used to log messages.
const InternalLogger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
    exitOnError: false
})

export default abstract class Logger {
    static info(message: string) {
        InternalLogger.info(message)
    }

    static error(message: string, error?: Error) {
        if (error) {
            InternalLogger.error(message, [serializeError(error)])
            return;
        }
        InternalLogger.error(message)
    }

    static debug(message: string) {
        InternalLogger.debug(message)
    }

    static warn(message: string, error?: Error) {
        if (error) {
            InternalLogger.warn(message, [serializeError(error)])
            return;
        }
        InternalLogger.warn(message)
    }
}