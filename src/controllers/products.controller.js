/* Ecommerce Server - Final Project */
// Archive: products.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductService from '../services/products.services.js';

/* Main Controller Logic */

class ProductController {
    // Returns the product list. If the limit parameter is specified, it returns the first N products.
    static async getProductList(req, res) {
        let { limit } = req.query;
        try {
            res.send( { status: 'success', data: await ProductService.getProducts(parseInt(limit)) } );
        } catch (err) {
            res.status(500).send( { status: 'error', message: "Internal Server Error: An error ocurred while trying to get the product list." });
        }
    };
    
    // Returns the product with the specified ID. If the product doesn't exist, it returns an error.
    static async getProduct(req, res) {
        let { pid } = req.params;
        try {
            let product = await ProductService.getProductById(pid);
            if (product.length === 0) {
                res.status(404).send( { status: 'error', message: "Not Found: The product with the specified ID does not exist." });
            } else {
                res.send( { status: 'success', data: product } );
            }
        } catch (err) {
            res.status(404).send( { status: 'error', message: "Not Found: The product with the specified ID does not exist."});
        }
    };

    // Adds a new product to the list. If the product already exists, it returns an error.
    static async addProduct(req, res) {
        let { title, description, code, price, status, stock, category, thumbnails } = req.body;
        try {
            let product = await ProductService.addProduct({ title, description, code, price, status, stock, category, thumbnails });
            res.send( { status: 'success', data: product } );
            res.app.get('io').emit('newProduct', product);
        } catch (err) {
            if (err.code === 11000) {
                res.status(409).send( { status: 'error', message: "Conflict: A product with the specified code already exists." } );
            } else if (err.name === 'ValidationError') {
                res.status(400).send( { status: 'error', message: "Bad Request: The product data is not valid." } );
            } else {
                res.status(500).send( { status: 'error', message: "Internal Server Error: An error ocurred while trying to add the product." } );
            }
        }
    };

    // Updates the product with the specified ID. If the product doesn't exist, it returns an error.
    static async updateProduct(req, res) {
        let { pid } = req.params;
        try {
            let status = await ProductService.updateProduct(pid, req.body);
            if (status.matchedCount === 0) {
                res.status(404).send( { status: 'error', message: "Not Found: The product with the specified ID does not exist." } );
            } else {
                res.send( { status: 'success', data: "Product updated successfully." } );
                res.app.get('io').emit('updateProduct', await ProductService.getProductById(pid)[0]);
            }
        } catch (err) {
            if (err.code === 11000) {
                res.status(409).send( { status: 'error', message: "Conflict: A product with the specified code already exists." } );
            } else if (err.name === 'CastError') {
                res.status(404).send( { status: 'error', message: "Not Found: The product with the specified ID does not exist." } );
            } else if (err.name === 'ValidationError') {
                res.status(400).send( { status: 'error', message: "Bad Request: The product data is not valid." } );
            } else {
                res.status(500).send( { status: 'error', message: "Internal Server Error: An error ocurred while trying to update the product." } );
            }
        }
    };

    // Deletes the product with the specified ID. If the product doesn't exist, it returns an error.
    static async deleteProduct(req, res) {
        let { pid } = req.params;
        try {
            let status = await ProductService.deleteProduct(pid);
            res.app.get('io').emit('deleteProduct', pid);
            if (status.deletedCount === 0) {
                res.status(404).send( { status: 'error', message: "Not Found: The product with the specified ID does not exist." } );
            } else {
                res.send( { status: 'success', data: "Product deleted successfully." } );
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    };
};

/* Exports */

export default ProductController;