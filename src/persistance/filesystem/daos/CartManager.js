/* Ecommerce Server - Final Project */
// Archive: CartManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import Cart from '../models/cart.model.js';
import ProductManager from './ProductManager.js';

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
                if (cart.products.length > 0) {
                    cart.products = await Promise.all(cart.products.map(async product => {
                        let productObj = await new ProductManager('./products.json').getProductById(product.pid);
                        return { pid: product.pid, quantity: product.quantity, productInfo: productObj};
                    }));
                }
                return cart;
            }
        } catch (err) {
            throw new Error(`An error occurred while searching for the cart with id ${id}: ` + err.message);
        }
    }

    /**
     * Adds a new `Product` object to the `Cart` object with the specified `id`. If the `Product` object already exists in the `Cart` object, its quantity is increased by 1.
     * @param {Number} id The `id` of the `Cart` object to which the `Product` object will be added.
     * @param {Number} productId The `Product` ID object to be added to the `Cart` object.
     * @returns {Cart} The `Cart` object with the specified `id`.
     * @throws {Error} Throws an error if the file cannot be read or written, or if the `Cart` object with the specified `id` does not exist.
     * @throws {Error} Throws an error if the `Product` object with the specified `id` does not exist.
     */
    async addProductToCart(id, productId) {
        try {
            let carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            let cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                await new ProductManager('./products.json').getProductById(productId);
                if (cart.products.find(product => product.pid === productId) === undefined) {
                    cart.products.push({ pid: productId, quantity: 1 });
                } else {
                    cart.products.find(product => product.pid === productId).quantity++;
                }
                await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
                return cart;
            }
        } catch (err) {
            throw new Error(`An error occurred while adding the product with id ${productId} to the cart with id ${id}: ` + err.message);
        }
    }
}

/* Exports */

export default CartManager;