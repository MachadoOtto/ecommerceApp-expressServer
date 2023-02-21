/* Ecommerce Server - Final Project */
// Archive: carts.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartService from "../services/carts.services.js";
import ProductService from "../services/products.services.js";

/* Main Controller Logic */

class CartController {
    // Creates a new cart instance.
    static async newCart(req, res) {
        try {
            let cart = await CartService.createCart();
            res.status(201).send( { status: 'success', message: `Cart created successfully. ID: ${cart._id}` } );
        } catch (err) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: The cart could not be created.' } );
        }
    };

    // Returns all carts from database.
    static async getCarts(req, res) {
        try {
            res.send( { status: 'success', data: await CartService.getCarts() });
        } catch (err) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the carts.' } );
        }
    };

    // Returns the cart with the specified ID. If the cart doesn't exist, it returns an error.
    static async getCart(req, res) {
        let { id } = req.params;
        try {
            let cart = await CartService.getCart(id);
            if (cart === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
            } else {
                cart.products = await Promise.all(cart.products.map( async (p) => {
                    let product = await ProductService.getProductById(p.id);
                    return { id: p.id, quantity: p.quantity, info: product };
                }));
                res.send( { status: 'success', data: cart } );
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the cart.' } );
            }
        }
    }

    // Adds a product to the cart with the specified ID. If the cart or the product doesn't exist, it returns an error.
    static async addProductToCart(req, res) {
        let { cid, pid } = req.params;
        try {
            let product = await ProductService.getProductById(pid);
            if (product === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The product with the specified ID does not exist.' } );
            } else {
                let cart = await CartService.addProduct(cid, product._id.toString());
                if (cart === null) {
                    res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
                } else {
                    res.send( { status: 'success', message: 'Product added to cart successfully.' } );
                }
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to add the product to the cart.' } );
            }
        }
    }
}

/* Exports */

export default CartController;