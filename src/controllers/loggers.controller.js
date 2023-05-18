/* Ecommerce Server - Final Project */
// Archive: loggers.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Main Controller Logic */

class LoggerController {
    // Test the logger in use.
    static async generateLoggerTest(req, res) {
        try {
            req.logger.debug('This is a debug message.');
            req.logger.http('This is an HTTP message.');
            req.logger.info('This is an info message.');
            req.logger.warning('This is a warning message.');
            req.logger.error('This is an error message.');
            req.logger.fatal('This is a fatal message.');
            res.send('Check the console or errors.log for logs.');
        } catch (err) {
            req.logger.warning(`[LoggerController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: "Internal Server Error: An error ocurred while trying to test the logger." });
        }
    };
};

/* Exports */

export default LoggerController;