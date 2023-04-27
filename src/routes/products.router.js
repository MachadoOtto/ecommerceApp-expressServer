/* Ecommerce Server - Final Project */
// Archive: products.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import ProductController from '../controllers/products.controller.js'
import AuthMiddleware from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const productsRouter = Router();
const isAdmin = AuthMiddleware.isAdmin;
const isAuthenticated = AuthMiddleware.isAuthenticated;

/* Routes */

productsRouter.route('/')
    .get(isAuthenticated, ProductController.getProductList)
    .post(isAdmin, ProductController.addProduct);

productsRouter.route('/:pid')
    .get(isAuthenticated, ProductController.getProduct)
    .put(isAdmin, ProductController.updateProduct)
    .delete(isAdmin, ProductController.deleteProduct);

/* Exports */

export default productsRouter;