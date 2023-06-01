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
const isAuthenticated = AuthMiddleware.isAuthenticated;
const productManagment = AuthMiddleware.productManagment;

/* Routes */

productsRouter.route('/')
    .get(isAuthenticated, ProductController.getProductList)
    .post(productManagment, ProductController.addProduct);

productsRouter.route('/:pid')
    .get(isAuthenticated, ProductController.getProduct)
    .put(productManagment, ProductController.updateProduct)
    .delete(productManagment, ProductController.deleteProduct);

/* Exports */

export default productsRouter;