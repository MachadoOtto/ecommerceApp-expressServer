/* Ecommerce Server - Final Project */
// Archive: CartManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

const fs = require('fs');
const Cart = require('../models/Cart.js');

/* Class CartManager */

class CartManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of carts.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, JSON.stringify({ lastId: this.#lastId, carts: [] }, null, '\t'));
        } else {
            // If the file exists, the lastId is read from it.
            let cartMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = cartMngrObj.lastId;
        }
    }

    /**
     * Generates a new `cart` and saves it to the file.
     * @returns {Cart} A new `Cart` object.
     * @throws {Error} Throws an error if the file cannot be read or written.
     */
    async newCart() {
        try {
            let carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).carts;
            let cart = new Cart(++this.#lastId);
            carts.push(cart);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
            return cart;
        } catch (err) {
            --this.#lastId;
            throw new Error('The cart could not be created');
        }
    }

    /**
     * Returns the `Cart` object with the specified `id`.
     * @param {Number} id The `id` of the `Cart` object to be returned.
     * @returns {Cart} The `Cart` object with the specified `id`.
     * @throws {Error} Throws an error if the file cannot be read or the `Cart` object with the specified `id` does not exist.
     */
    async getCart(id) {
        try {
            let carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            let cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                return cart;
            }
        } catch (err) {
            throw new Error(`An error occurred while searching for the cart with id ${id}: ` + err.message);
        }
    }
}

/* Exports */

module.exports = CartManager;