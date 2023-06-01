/* Ecommerce Server - Final Project */
// Archive: carts.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import CartController from '../controllers/carts.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const cartsRouter = Router();
const isAdmin = AuthMiddleware.isAdmin;
const notAdmin = AuthMiddleware.notAdmin;

/* Routes */

cartsRouter.route('/')
    .get(isAdmin, CartController.getCarts)
    .post(notAdmin, CartController.newCart);

cartsRouter.route('/:id')
    .get(notAdmin, CartController.getCart)
    .put(notAdmin, CartController.updateCart)
    .delete(notAdmin, CartController.removeAllProductsFromCart);

cartsRouter.route('/:cid/product/:pid')
    .post(notAdmin, CartController.addProductToCart)
    .put(notAdmin, CartController.modifyProductQuantityCart)
    .delete(notAdmin, CartController.removeProductFromCart)

cartsRouter.route('/:cid/purchase')
    .post(notAdmin, CartController.purchaseCart);

/* Exports */

export default cartsRouter;