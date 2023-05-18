/* Ecommerce Server - Final Project */
// Archive: logger.middleware.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Main Middleware Logic */

const logger = (req, res, next) => {
    req.logger.http(`Request received: ${req.ip} -> [${req.method}] ${req.url}`);
    next();
};

/* Exports */

export default logger;