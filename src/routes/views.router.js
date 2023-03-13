/* Ecommerce Server - Final Project */
// Archive: views.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import ViewController from '../controllers/views.controller.js';
import middlewares from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const viewsRouter = Router();
const isAuthenticated = middlewares.isAuthenticated;
const restrictSessionRoutes = middlewares.restrictSessionRoutes;

/* Routes */

viewsRouter.route('/')
    .get(isAuthenticated, ViewController.getHome);

viewsRouter.route('/realtimeproducts')
    .get(isAuthenticated, ViewController.getRealTimeProducts);

viewsRouter.route('/products')
    .get(isAuthenticated, ViewController.getProducts);

viewsRouter.route('/products/:pid')
    .get(isAuthenticated, ViewController.getProductDetail);

viewsRouter.route('/cart')
    .get(isAuthenticated, ViewController.getCart);

viewsRouter.route('/chat')
    .get(isAuthenticated, ViewController.getChat);

viewsRouter.route('/login')
    .get(restrictSessionRoutes, ViewController.getLogin);

viewsRouter.route('/register')
    .get(restrictSessionRoutes, ViewController.getRegister);

viewsRouter.route('/profile')
    .get(isAuthenticated, ViewController.getProfile);

/* Exports */

export default viewsRouter;