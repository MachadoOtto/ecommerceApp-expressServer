/* Ecommerce Server - Final Project */
// Archive: logger.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import winston from 'winston';
import Config from './config.js';

/* Main Logic */

// Log options definition
const winstonOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        debug: 'white',
        http: 'blue',
        info: 'green',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

// Development logger configuration
const developmentLogger = winston.createLogger({
    levels: winstonOptions.levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: winstonOptions.colors }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        })
    ]
});
  
// Configuración de logger para producción
const productionLogger = winston.createLogger({
    levels: winstonOptions.levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: winstonOptions.colors }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        })
    ]
});

class Logger {
    constructor() {
        if (Config.getEnvironment() === 'production') {
            this.logger = productionLogger;
        } else {
            this.logger = developmentLogger;
        }
    };

    addLogger = (req, res, next) => {
        req.logger = this.logger;
        next()
    };
};

/* Exports */

export default Logger;