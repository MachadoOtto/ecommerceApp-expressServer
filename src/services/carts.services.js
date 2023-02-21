/* Ecommerce Server - Final Project */
// Archive: carts.services.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartModel from "../dao/database/models/cart.models.js";

/* Services */

class CartService {
    /**
     * Creates a new cart instance.
     * @returns {Promise<CartModel>} The created cart.
     */
    static async createCart() {
        return await CartModel.create(undefined);
    };

    /**
     * Returns all carts from database.
     * @returns {Promise<CartModel[]>} All carts from database.
     */
    static async getCarts() {
        return await CartModel.find().lean();
    };

    /**
     * Returns the cart with the specified ID.
     * @param {String} id The cart ID.
     * @returns {Promise<CartModel>} The cart with the specified ID.
     */
    static async getCart(id) {
        return await CartModel.findOne( { _id: id } ).lean();
    };

    /**
     * Adds a product to the cart. If the product already exists, it will update the quantity.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to add.
     * @returns {Object} - Database response.
     */
    static async addProduct(id, productId) {
        let cart = await CartModel.findOne( { _id: id } );
        let productIndex = cart.products.findIndex( (p) => p.id === productId );
        if (productIndex === -1) {
            cart.products.push( { id: productId, quantity: 1 } );
        } else {
            cart.products[productIndex].quantity++;
        }
        return await cart.save();
    };
};

/* Exports */

export default CartService;