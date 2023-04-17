/* Ecommerce Server - Final Project */
// Archive: carts.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartRepository from "../repositories/cart.repository.js";
import Cart from "../entities/cart.js";

/* Services */

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    };

    /**
     * Creates a new cart instance.
     * @returns {Promise<Cart>} The created cart.
     */
    async createCart() {
        try {
            const cartEntity = this.cartRepository.create();
            return cartEntity;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error creating cart: ${error}`);
            throw new Error("Error creating cart");
        }
    };

    /**
     * Returns all carts from database.
     * @returns {Promise<Cart[]>} All carts from database.
     */
    async getCarts() {
        try {
            const carts = this.cartRepository.getAll();
            return carts;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error getting all carts: ${error}`);
            throw new Error("Error getting all carts");
        }
    };

    /**
     * Returns the cart with the specified ID.
     * @param {String} id The cart ID.
     * @returns {Promise<Cart>} The cart with the specified ID.
     */
    async getCart(id) {
        if (!id) {
            throw new Error("Cart ID is required");
        }
        try {
            const cart = this.cartRepository.getById(id);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error getting cart by id: ${error}`);
            throw new Error("Error getting cart by id");
        }
    };

    /**
     * Adds a product to the cart. If the product already exists, it will update the quantity.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to add.
     * @returns {CartModel} - The updated cart.
     */
    async addProduct(id, productId) {
        if (!id || !productId) {
            throw new Error("Cart ID and product ID are required");
        }
        try {
            const cart = this.cartRepository.addProduct(id, productId);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error adding product to cart: ${error}`);
            throw new Error("Error adding product to cart");
        }
    };

    /**
     * Modifies the 'products' array of the cart with the specified ID, replacing it with the new array.
     * @param {String} id The cart ID.
     * @param {Object[]} products The new array of products.
     * @returns {CartModel} - The updated cart.
     */
    async modifyProducts(id, newProducts) {
        if (!id || !newProducts) {
            throw new Error("Cart ID and products array are required");
        }
        try {
            // Find all the products in the new array that exist in the "products" collection.
            let productsIds = await ProductModel.find(
                { _id: { $in: newProducts.map(p => p.product) } }, '_id');
            // Filter the new array of products to only include the ones that exist in the "products" collection.
            let validProducts = newProducts.filter(p => productsIds.some(id => id.equals(p.product)));
            const cart = this.cartRepository.modifyProducts(id, validProducts);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error modifying products of cart: ${error}`);
            throw new Error("Error modifying products of cart");
        }
    };

    /**
     * Modifies the quantity of a product in the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to modify.
     * @param {Number} quantity The new quantity of the product.
     * @returns {CartModel} - The updated cart.
     */
    async modifyProductQuantity(id, productId, quantity) {
        if (!id || !productId || !quantity) {
            throw new Error("Cart ID, product ID and quantity are required");
        }
        try {
            const cart = this.cartRepository.modifyProductQuantity(id, productId, quantity);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error modifying product quantity of cart: ${error}`);
            throw new Error("Error modifying product quantity of cart");
        }
    };

    /**
     * Removes a product from the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to remove.
     * @returns {CartModel} - The updated cart.
     */
    async removeProduct(id, productId) {
        if (!id || !productId) {
            throw new Error("Cart ID and product ID are required");
        }
        try {
            const cart = this.cartRepository.removeProduct(id, productId);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error removing product from cart: ${error}`);
            throw new Error("Error removing product from cart");
        }
    };

    /**
     * Removes all products from the cart.
     * @param {String} id The cart ID.
     * @returns {CartModel} - The updated cart.
     */
    async removeAllProducts(id) {
        if (!id) {
            throw new Error("Cart ID is required");
        }
        try {
            const cart = this.cartRepository.removeAllProducts(id);
            return cart;
        } catch (error) {
            console.log(`[DEBUG][CartService] Error removing all products from cart: ${error}`);
            throw new Error("Error removing all products from cart");
        }
    };
};

/* Exports */

export default CartService;