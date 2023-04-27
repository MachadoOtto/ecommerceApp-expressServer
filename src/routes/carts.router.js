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
const isUser = AuthMiddleware.isUser;

/* Routes */

cartsRouter.route('/')
    .get(isAdmin, CartController.getCarts)
    .post(isUser, CartController.newCart);

cartsRouter.route('/:id')
    .get(isUser, CartController.getCart)
    .put(isUser, CartController.updateCart)
    .delete(isUser, CartController.removeAllProductsFromCart);

cartsRouter.route('/:cid/product/:pid')
    .post(isUser, CartController.addProductToCart)
    .put(isUser, CartController.modifyProductQuantityCart)
    .delete(isUser, CartController.removeProductFromCart)

cartsRouter.route('/:cid/purchase')
    .post(isUser, CartController.purchaseCart);

/* Exports */

export default cartsRouter;