/* Ecommerce Server - Final Project */
// Archive: mockings.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import MockingController from '../controllers/mockings.controller.js';

/* Main Router Logic */

const mockingsRouter = Router();

/* Routes */

mockingsRouter.route('/')
    .get(MockingController.generateProducts);

/* Exports */

export default mockingsRouter;