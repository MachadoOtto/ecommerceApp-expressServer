/* Ecommerce Server - Final Project */
// Archive: carts.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import Cart from "../entities/cart.js";
import ErrorUtils from "./errors/utils.error.js";
import Logger from "../config/logger.config.js";

/* Main Service Logic */

const log = new Logger();

/* Services */

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
        this.userRepository = new UserRepository();
    };

    /**
     * Creates a new cart instance.
     * @returns {Promise<Cart>} The created cart.
     */
    async createCart() {
        try {
            const cartEntity = await this.cartRepository.create();
            return cartEntity;
        } catch (error) {
            log.logger.debug(`[CartService] Error creating cart: ${error}`);
            ErrorUtils.cartCreateError(error);
        }
    };

    /**
     * Returns all carts from database.
     * @returns {Promise<Cart[]>} All carts from database.
     */
    async getCarts() {
        try {
            const carts = await this.cartRepository.getAll();
            return carts;
        } catch (error) {
            log.logger.debug(`[CartService] Error getting all carts: ${error}`);
            ErrorUtils.cartNotFoundError(error);
        }
    };

    /**
     * Returns the cart with the specified ID.
     * @param {String} id The cart ID.
     * @returns {Promise<Cart>} The cart with the specified ID.
     */
    async getCart(id) {
        if (!id) {
            ErrorUtils.cartIdRequiredError(`ID received: ${id}`);
        }
        try {
            const cart = await this.cartRepository.getById(id);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error getting cart by id: ${error}`);
            ErrorUtils.cartNotFoundError(`ID received: ${id}`);
        }
    };

    /**
     * Adds a product to the cart. If the product already exists, it will update the quantity.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to add.
     * @param {String} userId The ID of the user that owns the cart.
     * @returns {CartModel} - The updated cart.
     */
    async addProduct(id, productId, userId) {
        if (!id || !productId || !userId) {
            let cause = `Cart ID received: ${id}, Product ID received: ${productId}, User ID received: ${userId}`;
            if (!id) {
                ErrorUtils.cartIdRequiredError(cause);
            } else if (!productId) {
                ErrorUtils.productIdRequiredError(cause);
            } else {
                ErrorUtils.userIdRequiredError(cause);
            }
        }
        try {
            // Check if the userId cart is the same as the cartId.
            const user = await this.userRepository.getById(userId);
            console.log(user.cart.toString())
            console.log(id)
            if (user.cart.toString() !== id) {
                throw new Error(`The cart ID received does not match the user's cart ID.`);
            }
            // If user is the owner of the cart, the product is NOT added.
            const product = await this.productRepository.getProductById(productId);
            if (product.owner.email === user.email) {
                throw new Error(`The user is the owner of the product, so it cannot be added to the cart.`);
            }
            const cart = await this.cartRepository.addProduct(id, productId);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error adding product to cart: ${error}`);
            ErrorUtils.cartModifyError(`Cart ID received: ${id}, Product ID received: ${productId}, User ID received: ${userId}`);
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
            let cause = `Cart ID received: ${id}, Products IDs received: ${newProducts}`;
            if (!id) {
                ErrorUtils.cartIdRequiredError(cause);
            } else {
                ErrorUtils.productIdRequiredError(cause);
            }
        }
        try {
            // Find all the products in the new array that exist in the "products" collection.
            let productsIds = await ProductModel.find(
                { _id: { $in: newProducts.map(p => p.product) } }, '_id');
            // Filter the new array of products to only include the ones that exist in the "products" collection.
            let validProducts = await newProducts.filter(p => productsIds.some(id => id.equals(p.product)));
            const cart = await this.cartRepository.modifyProducts(id, validProducts);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error modifying products of cart: ${error}`);
            ErrorUtils.cartModifyError(`Cart ID received: ${id}`);
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
            let cause = `Cart ID received: ${id}, Product ID received: ${productId}, Quantity received: ${quantity}`;
            if (!id) {
                ErrorUtils.cartIdRequiredError(cause);
            } else if (!productId) {
                ErrorUtils.productIdRequiredError(cause);
            } else {
                ErrorUtils.cartProductQuantityRequiredError(cause);
            }
        }
        try {
            const cart = await this.cartRepository.modifyProductQuantity(id, productId, quantity);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error modifying product quantity of cart: ${error}`);
            ErrorUtils.cartModifyError(`Cart ID received: ${id}`);
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
            let cause = `Cart ID received: ${id}\nProducts IDs received: ${productId}`;
            if (!id) {
                ErrorUtils.cartIdRequiredError(cause);
            } else {
                ErrorUtils.productIdRequiredError(cause);
            }
        }
        try {
            const cart = await this.cartRepository.removeProduct(id, productId);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error removing product from cart: ${error}`);
            ErrorUtils.cartModifyError(`Cart ID received: ${id}`);
        }
    };

    /**
     * Removes all products from the cart.
     * @param {String} id The cart ID.
     * @returns {CartModel} - The updated cart.
     */
    async removeAllProducts(id) {
        if (!id) {
            ErrorUtils.cartIdRequiredError(`Cart ID received: ${id}`);
        }
        try {
            const cart = await this.cartRepository.removeAllProducts(id);
            return cart;
        } catch (error) {
            log.logger.debug(`[CartService] Error removing all products from cart: ${error}`);
            ErrorUtils.cartModifyError(`Cart ID received: ${id}`);
        }
    };
};

/* Exports */

export default CartService;