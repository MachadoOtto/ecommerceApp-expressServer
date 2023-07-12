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
const notAdmin = middlewares.notAdmin;
const restrictSessionRoutes = middlewares.restrictSessionRoutes;
const isAdmin = middlewares.isAdmin;

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
    .get(notAdmin, ViewController.getCart);

viewsRouter.route('/chat')
    .get(notAdmin, ViewController.getChat);

viewsRouter.route('/login')
    .get(restrictSessionRoutes, ViewController.getLogin);

viewsRouter.route('/register')
    .get(restrictSessionRoutes, ViewController.getRegister);

viewsRouter.route('/profile')
    .get(isAuthenticated, ViewController.getProfile);

viewsRouter.route('/tickets')
    .get(notAdmin, ViewController.getTickets);

viewsRouter.route('/tickets/:code')
    .get(notAdmin, ViewController.getTicketDetail);

viewsRouter.route('/passwordReset')
    .get(restrictSessionRoutes, ViewController.getPasswordReset);

viewsRouter.route('/passwordChange/:token')
    .get(restrictSessionRoutes, ViewController.getPasswordChange);

viewsRouter.route('/uploads')
    .get(isAuthenticated, ViewController.getUploads);

viewsRouter.route('/userManagement')
    .get(isAdmin, ViewController.getUserManagement);

/* Exports */

export default viewsRouter;