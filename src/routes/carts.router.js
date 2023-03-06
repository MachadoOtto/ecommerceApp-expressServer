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
    .get(CartController.getCart)
    .put(CartController.updateCart)
    .delete(CartController.removeAllProductsFromCart);

cartsRouter.route('/:cid/product/:pid')
    .post(CartController.addProductToCart)
    .put(CartController.modifyProductQuantityCart)
    .delete(CartController.removeProductFromCart)

/* Exports */

export default cartsRouter;