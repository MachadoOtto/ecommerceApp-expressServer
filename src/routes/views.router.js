/* Ecommerce Server - Final Project */
// Archive: views.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import ViewController from '../controllers/views.controller.js';

/* Main Router Logic */

const viewsRouter = Router();

/* Routes */

viewsRouter.route('/')
    .get(ViewController.getHome);

viewsRouter.route('/realtimeproducts')
    .get(ViewController.getRealTimeProducts);

viewsRouter.route('/products')
    .get(ViewController.getProducts);

viewsRouter.route('/products/:pid')
    .get(ViewController.getProductDetail);

viewsRouter.route('/cart/:cid')
    .get(ViewController.getCart);

viewsRouter.route('/chat')
    .get(ViewController.getChat);

/* Exports */

export default viewsRouter;