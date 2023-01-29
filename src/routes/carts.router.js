/* Ecommerce Server - Final Project */
// Archive: carts.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

const { Router } = require('express');
const CartManager = require('../controller/CartManager.js');

/* Main Router Logic */

const cartsRouter = Router();
const cartManager = new CartManager('./carts.json');

/* Routes */

// Generates a new cart instance.
cartsRouter.post('/', async (req, res) => {
    console.log(`[POST] ${req.ip} -> /api/carts`);
    try {
        let cart = await cartManager.newCart();
        res.status(201).send(`Cart created successfully. ID: ${cart.id}`);
    } catch (err) {
        res.status(500).send('Internal Server Error: The cart could not be created.');
    }
});

// Returns the cart with the specified ID. If the cart doesn't exist, it returns an error.
cartsRouter.get('/:id', async (req, res) => {
    let { id } = req.params;
    console.log(`[GET] ${req.ip} -> /api/carts/${id}`);
    if (!isFinite(String(id).trim() || NaN) || parseInt(id) <= 0) {
        res.status(400).send('Bad Request: The product ID must be a number greater than 0.');
    } else {
        try {
            res.send(JSON.stringify(await cartManager.getCart(parseInt(id)), null, '\t'));
        } catch (err) {
            if (err.message.includes('Not found')) {
                res.status(404).send('Not Found: The cart with the specified ID does not exist.');
            } else {
                res.status(500).send('Internal Server Error: An error ocurred while trying to retrieve the selected cart.');
            }
        }
    }
});

/* Exports */

module.exports = cartsRouter;