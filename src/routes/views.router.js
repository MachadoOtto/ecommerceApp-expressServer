/* Ecommerce Server - Final Project */
// Archive: views.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import { getHome, getRealTimeProducts } from '../controllers/views.controller.js';

/* Main Router Logic */

const viewsRouter = Router();

/* Routes */

viewsRouter.route('/')
    .get(getHome);

viewsRouter.route('/realtimeproducts')
    .get(getRealTimeProducts);

/* Exports */

export default viewsRouter;