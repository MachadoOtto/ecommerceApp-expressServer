/* Ecommerce Server - Final Project */
// Archive: products.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import ProductController from '../controllers/products.controller.js'

/* Main Router Logic */

const productsRouter = Router();

/* Routes */

productsRouter.route('/')
    .get(ProductController.getProductList)
    .post(ProductController.addProduct);

productsRouter.route('/:pid')
    .get(ProductController.getProduct)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

/* Exports */

export default productsRouter;