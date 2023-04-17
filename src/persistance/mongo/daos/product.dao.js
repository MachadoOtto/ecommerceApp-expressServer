/* Ecommerce Server - Final Project */
// Archive: product.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductModel from "../models/product.model.js";
import ProductDTO from "../../../dtos/product.dto.js";
import ProductListDTO from "../../../dtos/productList.dto.js";

/* Main DAO Logic */

class MongoDBProductDAO {
    /**
     * Adds a new product to the database.
     * @param {Object} data - Product object. 
     * @returns {Promise<ProductDTO>} - Product object added to the database.
     */
    async create(data) {
        try {
            const product = await ProductModel.create(data);
            const productDTO = new ProductDTO(product);
            return productDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error creating product: ${error}`);
            throw new Error("Error creating product");
        }
    };

    /**
     * Returns all products from database, limited by the limit parameter.
     * Uses the paginate plugin to return the products.
     * @param {Number} limit - Maximum number of products to return.
     * @param {Number} page - Page number to return.
     * @param {Object} query - Query object to filter the results.
     * @param {String} sort - Sort string to sort the results.
     * @returns {Promise<ProductListDTO>} - Object with all products.
     */
    async getProducts(limit = 10, page = 1, query = {}, sort = "") {
        try {
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: (sort) ? { price: sort === 'asc' ? 1 : -1 } : undefined };
            const products = await ProductModel.paginate(query, options);
            const productsDTO = new ProductListDTO(products);
            return productsDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error getting products: ${error}`);
            throw new Error("Error getting products");
        }
    };

    /**
     * Returns all products from database.
     * @returns {Promise<ProductDTO[]>} - Object with all products.
     */
    async getAllProducts() {
        try {
            const products = await ProductModel.find().lean();
            const productsDTO = products.map( product => new ProductDTO(product) );
            return productsDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error getting all products: ${error}`);
            throw new Error("Error getting all products");
        }
    };

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Promise<ProductDTO>} - Product object.
     */
    async getProductById(id) {
        try {
            const product = await ProductModel.findOne( { _id: id } ).lean();
            const productDTO = new ProductDTO(product);
            return productDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error getting product by id: ${error}`);
            throw new Error("Error getting product by id");
        }
    };

    /**
     * Updates a product from the database.
     * @param {Number} id - Product id. 
     * @param {Object} updateFields - Object with the fields to update.
     * @returns {Object} - Database response.
     */
    async updateProduct(id, updateFields) {
        try {
            return await ProductModel.updateOne( { _id: id }, { $set: updateFields } );
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error updating product: ${error}`);
            throw new Error("Error updating product");
        }
    };

    /**
     * Deletes a product from the database.
     * @param {Number} id - Product id.
     * @returns {Object} - Database response.
     */
    async deleteProduct(id) {
        try {
            return await ProductModel.deleteOne( { _id: id } );
        } catch (error) {
            console.log(`[DEBUG][MongoDBProductDAO] Error deleting product: ${error}`);
            throw new Error("Error deleting product");
        }
    };
};

/* Exports */

export default MongoDBProductDAO;