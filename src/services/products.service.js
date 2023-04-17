/* Ecommerce Server - Final Project */
// Archive: products.services.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductModel from "../persistance/mongo/models/product.model.js";

/* Services */

class ProductService {
    /**
     * Returns all products from database, limited by the limit parameter.
     * Uses the paginate plugin to return the products.
     * @param {Number} limit - Maximum number of products to return.
     * @param {Number} page - Page number to return.
     * @param {Object} query - Query object to filter the results.
     * @param {String} sort - Sort string to sort the results.
     * @returns {Promise<ProductModel[]>} - Object with all products.
     */
    static async getProducts(limit = 10, page = 1, query = {}, sort = "") {
        try {
            let options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: (sort) ? { price: sort === 'asc' ? 1 : -1 } : undefined };
            return await ProductModel.paginate(query, options);
        } catch (error) {
            throw error;
        }
    };

    /**
     * Returns all products from database.
     * @returns {Promise<ProductModel[]>} - Object with all products.
     */
    static async getAllProducts() {
        try {
            return await ProductModel.find().lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Promise<ProductModel>} - Product object.
     */
    static async getProductById(id) {
        try {
            return await ProductModel.findOne( { _id: id } ).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds a new product to the database.
     * @param {Object} product - Product object. 
     * @returns {Promise<ProductModel>} - Product object added to the database.
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
     * @returns {Object} - Database response.
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
     * @returns {Object} - Database response.
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