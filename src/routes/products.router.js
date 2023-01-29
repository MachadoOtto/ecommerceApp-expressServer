/* Ecommerce Server - Final Project */
// Archive: products.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

const { Router } = require('express');
const ProductManager = require('../controller/ProductManager.js');

/* Main Router Logic */

const productsRouter = Router();
const productManager = new ProductManager('./products.json');

/* Routes */

// Returns the product list. If the limit parameter is specified, it returns the first N products.
productsRouter.get("/", async (req, res) => {
    let { limit } = req.query;
    console.log(`[GET] ${req.ip} -> /api/products${limit ? `?limit=${limit}` : ''}`);
    try {
        res.send(JSON.stringify(await productManager.getProducts(parseInt(limit)), null, '\t'));
    } catch (err) {
        res.status(500).send('Internal Server Error: An error ocurred while trying to get the product list.');
    }
});

// Returns the product with the specified ID. If the product doesn't exist, it returns an error.
productsRouter.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    console.log(`[GET] ${req.ip} -> /api/products/${pid}`);
    if (!isFinite(String(pid).trim() || NaN) || parseInt(pid) <= 0) {
        res.status(400).send('Bad Request: The product ID must be a number greater than 0.');
    } else {
        try {
            res.send(JSON.stringify(await productManager.getProductById(parseInt(pid)), null, '\t'));
        } catch (err) {
            if (err.message.includes('Not found')) {
                res.status(404).send('Not Found: The product with the specified ID does not exist.');
            } else {
                res.status(500).send('Internal Server Error: An error ocurred while trying to retrieve the selected product.');
            }
        }
    }
});

// Adds a new product to the list. If the product already exists, it returns an error.
productsRouter.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;
    console.log(`[POST] ${req.ip} -> /api/products`);
    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.status(400).send('Bad Request: The product must have a title, description, code, price, status, stock and category.');
    } else {
        try {
            if (!thumbnails) {
                thumbnails = [];
            }
            await productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
            res.send(`The product "${title}" was added successfully.`);
        } catch (err) {
            if (err.message.includes('Code already exists')) {
               res.status(400).send('Bad Request: The product already exists.');
            } else if (err.message.includes('The product could not be added')) {
                res.status(400).send(`Bad Request: ${err.message}.`);
            } else {
                console.log(err.message)
                res.status(500).send('Internal Server Error: An error ocurred while trying to add a new product.');
            }
        }
    }
});

// Updates the product with the specified ID. If the product doesn't exist, it returns an error.
productsRouter.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    console.log(`[PUT] ${req.ip} -> /api/products/${pid}`);
    if (!isFinite(String(pid).trim() || NaN) || parseInt(pid) <= 0) {
        res.status(400).send('Bad Request: The product ID must be greater than 0.');
    } else {
        try {
            let { errorFields } = await productManager.updateProduct(parseInt(pid), req.body);
            if (errorFields && errorFields.length > 0) {
                res.send(`The product with the ID ${pid} was updated successfully. The following fields were not updated: ${errorFields.join(', ')}.`);
            } else {
                res.send(`The product with the ID ${pid} was updated successfully.`);
            }
        } catch (err) {
            if (err.message.includes('Not found')) {
                res.status(404).send('Not Found: The product with the specified ID does not exist.');
            } else if (err.message.includes('Code already exists')) {
                res.status(400).send('Bad Request: Code already exists.');
            } else {
                res.status(500).send('Internal Server Error: An error ocurred while trying to update the selected product.');
            }
        }
    }
});

// Deletes the product with the specified ID. If the product doesn't exist, it returns an error.
productsRouter.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    console.log(`[DELETE] ${req.ip} -> /api/products/${pid}`);
    if (!isFinite(String(pid).trim() || NaN) || parseInt(pid) <= 0) {
        res.status(400).send('Bad Request: The product ID must be a number greater than 0.');
    } else {
        try {
            await productManager.deleteProduct(parseInt(pid));
            res.send(`The product with the ID ${pid} was deleted successfully.`);
        } catch (err) {
            if (err.message.includes('Not found')) {
                res.status(404).send('Not Found: The product with the specified ID does not exist.');
            } else {
                res.status(500).send('Internal Server Error: An error ocurred while trying to delete the selected product.');
            }
        }
    }
});

/* Exports */

module.exports = productsRouter;