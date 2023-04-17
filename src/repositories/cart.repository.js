/* Ecommerce Server - Final Project */
// Archive: cart.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import Cart from "../entities/cart.js";

/* Main Repository Logic */

class CartRepository {
    constructor() {
        this.dao = FactoryDAO.getCartDAO(Config.getDao());
    };

    /**
     * Creates a new cart
     * @returns {Cart} The new cart
     */
    async create() {
        try {
            const cartDTO = await this.dao.create();
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error creating cart: ${error}`);
            throw new Error("Error creating cart");
        }
    };

    /**
     * Returns all carts in the database
     * @returns {Cart[]} An array of carts
     */
    async getAll() {
        try {
            const cartDTOs = await this.dao.getAll();
            const carts = cartDTOs.map(cartDTO => new Cart(cartDTO));
            return carts;
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error getting all carts: ${error}`);
            throw new Error("Error getting all carts");
        }
    };

    /**
     * Returns a cart by id
     * @param {String} id
     * @returns {Cart} The cart with the given id
     */
    async getById(id) {
        try {
            const cartDTO = await this.dao.getById(id);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error getting cart by id: ${error}`);
            throw new Error("Error getting cart by id");
        }
    };

    /**
     * Adds a product to a cart
     * @param {String} id
     * @param {String} productId
     * @returns {Cart} The cart with the given id
     */
    async addProduct(id, productId) {
        try {
            const cartDTO = await this.dao.addProduct(id, productId);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error adding product to cart: ${error}`);
            throw new Error("Error adding product to cart");
        }
    };

    /**
     * Modifies the products of a cart
     * @param {String} id
     * @param {String[]} newProducts
     * @returns {Cart} The cart with the given id
     */
    async modifyProducts(id, newProducts) {
        try {
            const cartDTO = await this.dao.modifyProducts(id, newProducts);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error modifying products of cart: ${error}`);
            throw new Error("Error modifying products of cart");
        }
    };

    /**
     * Modifies the quantity of a product in a cart
     * @param {String} id 
     * @param {String} productId 
     * @param {Number} quantity
     * @returns {Cart} The cart with the given id
     */
    async modifyProductQuantity(id, productId, quantity) {
        try {
            const cartDTO = await this.dao.modifyProductQuantity(id, productId, quantity);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error modifying product quantity of cart: ${error}`);
            throw new Error("Error modifying product quantity of cart");
        }
    };

    /**
     * Removes a product from a cart
     * @param {String} id 
     * @param {String} productId
     * @returns {Cart} The cart with the given id 
     */
    async removeProduct(id, productId) {
        try {
            const cartDTO = await this.dao.removeProduct(id, productId);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error removing product from cart: ${error}`);
            throw new Error("Error removing product from cart");
        }
    };

    /**
     * Removes all products from a cart
     * @param {String} id 
     * @returns {Cart} The cart with the given id
     */
    async removeAllProducts(id) {
        try {
            const cartDTO = await this.dao.removeAllProducts(id);
            return new Cart(cartDTO);
        } catch (error) {
            console.log(`[DEBUG][CartRepository] Error removing all products from cart: ${error}`);
            throw new Error("Error removing all products from cart");
        }
    };
};

/* Exports */

export default CartRepository;