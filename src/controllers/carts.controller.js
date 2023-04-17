/* Ecommerce Server - Final Project */
// Archive: carts.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";

/* Main Controller Logic */

const cartService = new CartService();
const productService = new ProductService();

class CartController {
    // Creates a new cart instance.
    static async newCart(req, res) {
        try {
            let cart = await cartService.createCart();
            res.status(201).send( { status: 'success', message: `Cart created successfully. ID: ${cart._id}` } );
        } catch (err) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: The cart could not be created.' } );
            console.log(`[DEBUG][CartController] Error in newCart: ${err.message}`);
        }
    };

    // Returns all carts from database.
    static async getCarts(req, res) {
        try {
            let carts = await cartService.getCarts();
            res.send( { status: 'success', data: carts });
        } catch (err) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the carts.' } );
            console.log(`[DEBUG][CartController] Error in getCarts: ${err.message} + ${err.stack}`);
        }
    };

    // Returns the cart with the specified ID. If the cart doesn't exist, it returns an error.
    static async getCart(req, res) {
        let { id } = req.params;
        try {
            let cart = await cartService.getCart(id);
            if (cart === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
            } else {
                res.send( { status: 'success', data: cart } );
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the cart.' } );
            }
            console.log(`[DEBUG][CartController] Error in getCart: ${err.message}`);
        }
    };

    // Adds a product to the cart with the specified ID. If the cart or the product doesn't exist, it returns an error.
    static async addProductToCart(req, res) {
        let { cid, pid } = req.params;
        try {
            let product = await productService.getProductById(pid);
            if (product === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The product with the specified ID does not exist.' } );
            } else {
                let cart = await cartService.addProduct(cid, product._id);
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
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to add the product to the cart.' } );
            }
            console.log(`[DEBUG][CartController] Error in addProductToCart: ${err.message}`);
        }
    };

    // Modifies the 'products' array of the cart with the specified ID. If the cart doesn't exist, it returns an error.
    static async updateCart(req, res) {
        let { id } = req.params;
        let { products } = req.body;
        try {
            let cart = await cartService.modifyProducts(id, products);
            if (cart === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
            } else {
                res.send( { status: 'success', message: 'Products modified successfully.' } );
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to modify the products.' } );
            }
            console.log(`[DEBUG][CartController] Error in updateCart: ${err.message}`);
        }
    };

    // Modifies the quantity of a product in the cart with the specified ID. If the cart or the product doesn't exist, it returns an error.
    static async modifyProductQuantityCart(req, res) {
        let { cid, pid } = req.params;
        let { quantity } = req.body;
        try {
            if (quantity <= 0) {
                res.status(400).send( { status: 'error', message: 'Bad Request: The quantity must be greater than 0.' } );
            } else {
                let cart = await cartService.modifyProductQuantity(cid, pid, quantity);
                if (cart === null) {
                    res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist, or the product is not in the cart.' } );
                } else {
                    res.send( { status: 'success', message: 'Product quantity modified successfully.' } );
                }
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid or the quantity is not a number.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to modify the product quantity.' } );
            }
            console.log(`[DEBUG][CartController] Error in modifyProductQuantityCart: ${err.message}`);
        }
    };

    // Removes a product from the cart with the specified ID. If the cart or the product doesn't exist, it returns an error.
    static async removeProductFromCart(req, res) {
        let { cid, pid } = req.params;
        try {
            let product = await productService.getProductById(pid);
            if (product === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The product with the specified ID does not exist.' } );
            } else {
                let cart = await cartService.removeProduct(cid, product._id);
                if (cart === null) {
                    res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
                } else {
                    res.send( { status: 'success', message: 'Product removed from cart successfully.' } );
                }
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to remove the product from the cart.' } );
            }
            console.log(`[DEBUG][CartController] Error in removeProductFromCart: ${err.message}`);
        }
    };

    // Removes all products from the cart with the specified ID. If the cart doesn't exist, it returns an error.
    static async removeAllProductsFromCart(req, res) {
        let { id } = req.params;
        try {
            let cart = await cartService.removeAllProducts(id);
            if (cart === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
            } else {
                res.send( { status: 'success', message: 'All products removed from cart successfully.' } );
            }
        } catch (err) {
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to remove all products from the cart.' } );
            }
            console.log(`[DEBUG][CartController] Error in removeAllProductsFromCart: ${err.message}`);
        }
    };    
}

/* Exports */

export default CartController;