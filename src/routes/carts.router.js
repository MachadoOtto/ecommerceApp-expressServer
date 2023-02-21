/* Ecommerce Server - Final Project */
// Archive: carts.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import { createCart, getCart, addProductToCart } from '../controllers/carts.controller.js';

/* Main Router Logic */

const cartsRouter = Router();

/* Routes */

cartsRouter.route('/')
    .post(createCart);

cartsRouter.route('/:id')
    .get(getCart);

cartsRouter.route('/:cid/product/:pid')
    .post(addProductToCart);

/* Exports */

export default cartsRouter;