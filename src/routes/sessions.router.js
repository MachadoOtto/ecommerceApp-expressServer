/* Ecommerce Server - Final Project */
// Archive: sessions.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import SessionController from '../controllers/sessions.controller.js';
import middlewares from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const sessionRouter = Router();
const restrictSessionRoutes = middlewares.restrictSessionRoutes;

/* Routes */

sessionRouter.route('/login')
    .post(restrictSessionRoutes, SessionController.loginUser);

sessionRouter.route('/register')
    .post(restrictSessionRoutes, SessionController.registerUser);

sessionRouter.route('/logout')
    .get(SessionController.logoutUser);

sessionRouter.route('/user/cart')
    .get(SessionController.getUserCart);

/* Exports */

export default sessionRouter;