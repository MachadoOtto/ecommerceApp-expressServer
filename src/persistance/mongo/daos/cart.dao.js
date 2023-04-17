/* Ecommerce Server - Final Project */
// Archive: cart.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartModel from "../models/cart.model.js";
import CartDTO from "../../../dtos/cart.dto.js";
import ProductDTO from "../../../dtos/product.dto.js";

/* Main DAO Logic */

class MongoDBCartDAO {
    /**
     * Create a new cart in the database.
     * @returns {Promise<CartDTO>} - Cart DTO.
     */
    async create() {
        try {
            const newCart = await CartModel.create(undefined);
            const cartDTO = new CartDTO(newCart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error creating cart: ${error}`);
            throw new Error("Error creating cart");
        }
    };

    /**
     * Get all carts from the database.
     * @returns {Promise<CartDTO[]>} - Cart DTO array.
     */
    async getAll() {
        try {
            const carts = await CartModel.find().lean();
            const cartDTOs = carts.map(cart => new CartDTO(cart));
            return cartDTOs;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error getting all carts: ${error}`);
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
            const cart = await CartModel.findById(id).lean();
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error getting cart by id: ${error}`);
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
            let cart = await CartModel.findOneAndUpdate(
                { _id: id, "products.product": { $ne: productId } },
                { $addToSet: { products: { product: productId, quantity: 1 } } },
                { new: true });
            if (!cart) {
                cart = await CartModel.findOneAndUpdate(
                    { _id: id, "products.product": productId },
                    { $inc: { "products.$.quantity": 1 } },
                    { new: true });
            }
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error adding product to cart: ${error}`);
            throw new Error("Error adding product to cart");
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
            const cart = await CartModel.findOneAndUpdate(
                { _id: id }, 
                { $set: { products: newProducts } }, 
                { new: true, runValidators: true }).populate('products.product');
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error modifying products of cart: ${error}`);
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
            const updatedCart = await CartModel.findOneAndUpdate( 
                { _id: id, "products.product": productId }, 
                { $set: { "products.$.quantity": quantity } });
            const cartDTO = new CartDTO(updatedCart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error modifying product quantity: ${error}`);
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
            const cart = await CartModel.findOneAndUpdate(
                { _id: id },
                { $pull: { products: { product: productId } } });
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error removing product from cart: ${error}`);
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
            const cart = await CartModel.findOneAndUpdate(
                { _id: id }, 
                { $set: { products: [] } });
            const cartDTO = new CartDTO(cart);
            return cartDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBCartDAO] Error removing all products from cart: ${error}`);
            throw new Error("Error removing all products from cart");
        }
    };
};

/* Exports */

export default MongoDBCartDAO;