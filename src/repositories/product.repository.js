/* Ecommerce Server - Final Project */
// Archive: product.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import Product from "../entities/product.js";
import ProductList from "../entities/productList.js";
import Logger from "../config/logger.config.js";

/* Main Repository Logic */

const log = new Logger();

class ProductRepository {
    constructor() {
        this.dao = FactoryDAO.getProductDAO(Config.getDao());
    };

    /**
     * Adds a new product to the database.
     * @param {Object} data - Product object. 
     * @returns {Product} - Product object added to the database.
     */
    async create(data) {
        try {
            const productDTO = await this.dao.create(data);
            return new Product(productDTO);
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error creating product: ${error}`);
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
     * @returns {ProductList} - Object with all products.
     */
    async getProducts(limit = 10, page = 1, query = {}, sort = "") {
        try {
            const productsDTO = await this.dao.getProducts(limit, page, query, sort);
            const products = new ProductList(productsDTO);
            return products;
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error getting products: ${error}`);
            throw new Error("Error getting products");
        }
    };

    /**
     * Returns all products from database.
     * @returns {Product[]} - Object with all products.
     */
    async getAllProducts() {
        try {
            const productsDTO = await this.dao.getAllProducts();
            const products = productsDTO.map( product => new Product(product) );
            return products;
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error getting all products: ${error}`);
            throw new Error("Error getting all products");
        }
    };

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Product} - Product object.
     */
    async getProductById(id) {
        try {
            const productDTO = await this.dao.getProductById(id);
            return new Product(productDTO);
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error getting product by id: ${error}`);
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
            return await this.dao.updateProduct(id, updateFields);
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error updating product: ${error}`);
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
            return await this.dao.deleteProduct(id);
        } catch (error) {
            log.logger.debug(`[ProductRepository] Error deleting product: ${error}`);
            throw new Error("Error deleting product");
        }
    };
};

/* Exports */

export default ProductRepository;