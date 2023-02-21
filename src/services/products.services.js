/* Ecommerce Server - Final Project */
// Archive: products.services.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductModel from "../dao/database/models/product.models.js";

/* Services */

class ProductService {
    /**
     * Returns all products from database, limited by the limit parameter.
     * @param {Number} limit - Maximum number of products to return. 
     * @returns {Object} - Object with all products.
     */
    static async getProducts(limit) {
        try {
            return await ProductModel.find().limit(limit).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Object} - Product object.
     */
    static async getProductById(id) {
        try {
            return await ProductModel.find( { _id: id } ).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds a new product to the database.
     * @param {Object} product - Product object. 
     * @returns {Object} - Product object added to the database.
     */
    static async addProduct(product) {
        try {
            return await ProductModel.create(product);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a product from the database.
     * @param {Number} id - Product id. 
     * @param {Object} updateFields - Object with the fields to update.
     * @returns {Object} - Product object updated.
     */
    static async updateProduct(id, updateFields) {
        try {
            return await ProductModel.updateOne( { _id: id }, { $set: updateFields } );
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a product from the database.
     * @param {Number} id - Product id.
     * @returns {Object} - Product object deleted.
     */
    static async deleteProduct(id) {
        try {
            return await ProductModel.deleteOne( { _id: id } );
        } catch (error) {
            throw error;
        }
    }
};

/* Exports */

export default ProductService;