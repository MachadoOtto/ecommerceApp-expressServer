/* Ecommerce Server - Final Project */
// Archive: CartManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import Cart from '../models/cart.model.js';
import CartDTO from '../../../dtos/cart.dto.js';
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
    };

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

    /**
     * Create a new cart in the database.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async create() {
        try {
            const cart = new Cart(++this.#lastId);
            const carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).carts;                      
            carts.push(cart);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
            const cartDTO = new CartDTO(newCart);
            return cartDTO;
        } catch (error) {
            --this.#lastId;
            console.log(`[DEBUG][CartManager] Error creating cart: ${error}`);
            throw new Error("Error creating cart");
        }
    };

    /**
     * Get all carts from the database.
     * @returns {Promise<CartDTO[]>} - Cart DTO array.
     */
    async getAll() {
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).carts;
            const cartDTOs = carts.map(cart => new CartDTO(cart));
            return cartDTOs;
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error getting all carts: ${error}`);
            throw new Error("Error getting all carts");
        }
    };

    /**
     * Get a cart from the database using its ID.
     * @param {String} id - Cart ID.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async getById(id) {
        try {
            const carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).carts;
            const cart = carts.find(cart => cart.id === id);
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error getting cart by id: ${error}`);
            throw new Error("Error getting cart by id");
        }
    };

    /**
     * Adds a product to the cart. If the product already exists, it will update the quantity.
     * @param {String} id - Cart ID.
     * @param {String} productId - Product ID.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async addProduct(id, productId) {
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
                const cartDTO = new CartDTO(cart);
                return cartDTO;
            }
        } catch (err) {
            console.log(`[DEBUG][CartManager] Error adding product to cart: ${error}`);
            throw new Error(`An error occurred while adding the product with id ${productId} to the cart with id ${id}: ` + err.message);
        }
    };
    
    /**
     * Modifies the 'products' array of the cart with the specified ID, replacing it with the new array.
     * @param {String} id The cart ID.
     * @param {ProductDTO[]} newProducts The new array of products.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async modifyProducts(id, newProducts) {
        try {
            const carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            const cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                // Only save the products ids and quantities
                cart.products = newProducts.map(product => ({ pid: product.id, quantity: product.quantity }));
                await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
                const cartDTO = new CartDTO(cart);
                return cartDTO;
            }
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error modifying products of cart: ${error}`);
            throw new Error("Error modifying products of cart");
        }
    };

    /**
     * Modifies the quantity of a product in the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to modify.
     * @param {Number} quantity The new quantity of the product.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async modifyProductQuantity(id, productId, quantity) {
        try {
            const carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            const cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                const product = cart.products.find(product => product.pid === productId);
                if (product === undefined) {
                    throw new Error(`Not found: Product with ID ${productId} does not exist in cart with ID ${id}`);
                } else {
                    product.quantity = quantity;
                    await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
                    const cartDTO = new CartDTO(updatedCart);
                    return cartDTO;
                }
            }
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error modifying product quantity: ${error}`);
            throw new Error("Error modifying product quantity");
        }
    };

    /**
     * Removes a product from the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to remove.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async removeProduct(id, productId) {
        try {
            const carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            const cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                const product = cart.products.find(product => product.pid === productId);
                if (product === undefined) {
                    throw new Error(`Not found: Product with ID ${productId} does not exist in cart with ID ${id}`);
                } else {
                    cart.products = cart.products.filter(product => product.pid !== productId);
                    await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
                    const cartDTO = new CartDTO(cart);
                    return cartDTO;
                }
            }
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error removing product from cart: ${error}`);
            throw new Error("Error removing product from cart");
        }
    };

    /**
     * Removes all products from the cart.
     * @param {String} id The cart ID.
     * @returns {CartModel} - The updated cart.
     */
    async removeAllProducts(id) {
        try {
            const carts = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).carts;
            const cart = carts.find(cart => cart.id === id);
            if (cart === undefined) {
                throw new Error(`Not found: Cart with ID ${id} does not exist`);
            } else {
                cart.products = [];
                await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, carts: carts }, null, '\t'));
                const cartDTO = new CartDTO(cart);
                return cartDTO;
            }
        } catch (error) {
            console.log(`[DEBUG][CartManager] Error removing all products from cart: ${error}`);
            throw new Error("Error removing all products from cart");
        }
    };
};

/* Exports */

export default CartManager;