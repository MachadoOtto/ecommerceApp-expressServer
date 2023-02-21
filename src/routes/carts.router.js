/* Ecommerce Server - Final Project */
// Archive: carts.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import CartController from '../controllers/carts.controller.js';

/* Main Router Logic */

const cartsRouter = Router();

/* Routes */

cartsRouter.route('/')
    .get(CartController.getCarts)
    .post(CartController.newCart);

cartsRouter.route('/:id')
    .get(CartController.getCart);

cartsRouter.route('/:cid/product/:pid')
    .post(CartController.addProductToCart);

/* Exports */

export default cartsRouter;