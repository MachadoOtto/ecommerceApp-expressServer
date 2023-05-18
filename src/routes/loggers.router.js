/* Ecommerce Server - Final Project */
// Archive: loggers.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import LoggerController from '../controllers/loggers.controller.js';

/* Main Router Logic */

const loggersRouter = Router();

/* Routes */

loggersRouter.route('/')
    .get(LoggerController.generateLoggerTest);

/* Exports */

export default loggersRouter;