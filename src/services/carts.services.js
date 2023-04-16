/* Ecommerce Server - Final Project */
// Archive: carts.services.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CartModel from "../persistance/mongo/models/cart.models.js";
import ProductModel from "../persistance/mongo/models/product.models.js";

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
     * @returns {CartModel} - The updated cart.
     */
    static async addProduct(id, productId) {
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
        return cart;
    };

    /**
     * Modifies the 'products' array of the cart with the specified ID, replacing it with the new array.
     * @param {String} id The cart ID.
     * @param {Object[]} products The new array of products.
     * @returns {CartModel} - The updated cart.
     */
    static async modifyProducts(id, newProducts) {
        // Find all the products in the new array that exist in the "products" collection.
        let productsIds = await ProductModel.find(
            { _id: { $in: newProducts.map(p => p.product) } }, '_id');
        // Filter the new array of products to only include the ones that exist in the "products" collection.
        let validProducts = newProducts.filter(p => productsIds.some(id => id.equals(p.product)));
        let cart = await CartModel.findOneAndUpdate(
            { _id: id }, 
            { $set: { products: validProducts } }, 
            { new: true, runValidators: true }).populate('products.product');
        return cart;
    };

    /**
     * Modifies the quantity of a product in the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to modify.
     * @param {Number} quantity The new quantity of the product.
     * @returns {CartModel} - The updated cart.
     */
    static async modifyProductQuantity(id, productId, quantity) {
        let updatedCart = await CartModel.findOneAndUpdate( 
            { _id: id, "products.product": productId }, 
            { $set: { "products.$.quantity": quantity } });
        return updatedCart;
    };

    /**
     * Removes a product from the cart.
     * @param {String} id The cart ID.
     * @param {Object} productId The ID of the product to remove.
     * @returns {CartModel} - The updated cart.
     */
    static async removeProduct(id, productId) {
        let cart = await CartModel.findOneAndUpdate(
            { _id: id },
            { $pull: { products: { product: productId } } });
        return cart;
    };

    /**
     * Removes all products from the cart.
     * @param {String} id The cart ID.
     * @returns {CartModel} - The updated cart.
     */
    static async removeAllProducts(id) {
        let cart = await CartModel.findOneAndUpdate(
            { _id: id }, 
            { $set: { products: [] } });
        return cart;
    };
};

/* Exports */

export default CartService;