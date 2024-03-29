/* Ecommerce Server - Final Project */
// Archive: carts.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";
import TicketService from "../services/tickets.service.js";
import NodemailerTransporter from "../config/nodemailer.config.js";

/* Main Controller Logic */

const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();
const nodemailerTransporter = new NodemailerTransporter();

class CartController {
    // Creates a new cart instance.
    static async newCart(req, res) {
        try {
            let cart = await cartService.createCart();
            res.status(201).send( { status: 'success', message: `Cart created successfully. ID: ${cart._id}` } );
        } catch (err) {
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: 'Internal Server Error: The cart could not be created.' } );
        }
    };

    // Returns all carts from database.
    static async getCarts(req, res) {
        try {
            let carts = await cartService.getCarts();
            res.send( { status: 'success', data: carts });
        } catch (err) {
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the carts.' } );
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
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the cart.' } );
            }
        }
    };

    // Adds a product to the cart with the specified ID. If the cart or the product doesn't exist, it returns an error.
    static async addProductToCart(req, res) {
        let { cid, pid } = req.params;
        let userId = req.user._id;
        try {
            let product = await productService.getProductById(pid);
            if (product === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The product with the specified ID does not exist.' } );
            } else {
                let cart = await cartService.addProduct(cid, product._id, userId);
                if (cart === null) {
                    res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
                } else {
                    res.send( { status: 'success', message: 'Product added to cart successfully.' } );
                }
            }
        } catch (err) {
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to add the product to the cart.' } );
            }
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
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to modify the products.' } );
            }
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
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid or the quantity is not a number.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to modify the product quantity.' } );
            }
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
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to remove the product from the cart.' } );
            }
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
            req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to remove all products from the cart.' } );
            }
        }
    };

    // Finalizes the process of buying the products in the cart with the specified ID. If the cart doesn't exist, it returns an error.
    // Generates a new ticket and adds it to the user's tickets.
    // Removes all products purchased from the cart.
    static async purchaseCart(req, res) {
        let { cid } = req.params;
        let user = req.session.user;
        if (!user) {
            res.status(401).send( { status: 'error', message: 'Unauthorized: You must be logged in to purchase products.' } );
        } else {
            try {
                let cart = await cartService.getCart(cid);
                if (cart === null) {
                    res.status(404).send( { status: 'error', message: 'Not Found: The cart with the specified ID does not exist.' } );
                } else {
                    let purchaser = user._id;
                    let ticket = await ticketService.createTicket( { purchaser, cart } );
                    ticket = await ticketService.getTicket(ticket._id);
                    await nodemailerTransporter.sendEmailTicket(ticket);
                    res.status(201).send( { status: 'success', message: 'Products purchased successfully.', ticket } );              
                }
            } catch (err) {
                req.logger.warning(`[CartController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
                if (err.name === 'CastError') {
                    res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
                } else {
                    res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to purchase the products.' } );
                }
            }
        }
    };
};

/* Exports */

export default CartController;