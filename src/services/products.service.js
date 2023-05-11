/* Ecommerce Server - Final Project */
// Archive: products.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductRepository from "../repositories/product.repository.js";
import Product from "../entities/product.js";
import ErrorUtils from "./errors/utils.error.js";

/* Services */

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    };

    /**
     * Returns all products from database, limited by the limit parameter.
     * Uses the paginate plugin to return the products.
     * @param {Number} limit - Maximum number of products to return.
     * @param {Number} page - Page number to return.
     * @param {Object} query - Query object to filter the results.
     * @param {String} sort - Sort string to sort the results.
     * @returns {Promise<Product[]>} - Object with all products.
     */
    async getProducts(limit = 10, page = 1, query = {}, sort = "") {
        try {
            const products = await this.productRepository.getProducts(limit, page, query, sort);
            return products;
        } catch (error) {
            let cause = `Limit received: ${limit}, Page received: ${page}, Query received: ${query}, Sort received: ${sort}`;
            console.log(`[DEBUG][ProductService] Error getting products: ${error}`);
            ErrorUtils.productNotFound(cause);
        }
    };

    /**
     * Returns all products from database.
     * @returns {Promise<Product[]>} - Object with all products.
     */
    async getAllProducts() {
        try {
            const products = await this.productRepository.getAllProducts();
            return products;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error getting all products: ${error}`);
            ErrorUtils.productNotFound(error);
        }
    };

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Promise<ProductModel>} - Product object.
     */
    async getProductById(id) {
        if (!id) {
            let cause = `Product ID received: ${id}`;
            ErrorUtils.productIdRequiredError(cause);
        }
        try {
            const product = await this.productRepository.getProductById(id);
            return product;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error getting product by id: ${error}`);
            let cause = `Product ID received: ${id}`;
            ErrorUtils.productNotFound(cause);
        }
    };

    /**
     * Adds a new product to the database.
     * @param {Object} product - Product object. 
     * @returns {Promise<Product>} - Product object added to the database.
     */
    async addProduct(product) {
        if (!product) {
            let cause = `Product received: ${product}`;
            ErrorUtils.productCreateError(cause);
        }
        try {
            const newProduct = await this.productRepository.create(product);
            return newProduct;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error adding product: ${error}`);
            let cause = `Product received: ${product}`;
            ErrorUtils.productCreateError(cause);
        }
    };

    /**
     * Updates a product from the database.
     * @param {Number} id - Product id. 
     * @param {Object} updateFields - Object with the fields to update.
     * @returns {Object} - Database response.
     */
    async updateProduct(id, updateFields) {
        if (!id) {
            let cause = `Product ID received: ${id}, Update fields received: ${updateFields}`;
            ErrorUtils.productIdRequiredError(cause);
        }
        if (!updateFields) {
            let cause = `Product ID received: ${id}, Update fields received: ${updateFields}`;
            ErrorUtils.productUpdateFieldsError(cause);
        }
        try {
            const response = await this.productRepository.updateProduct(id, updateFields);
            if (response.matchedCount === 0) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.productRepository.getProductById(id);
            return updatedProduct;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error updating product: ${error}`);
            let cause = `Product ID received: ${id}, Update fields received: ${updateFields}`
            ErrorUtils.productModifyError(cause);
        }
    };

    /**
     * Deletes a product from the database.
     * @param {Number} id - Product id.
     * @returns {Object} - Database response.
     */
    async deleteProduct(id) {
        if (!id) {
            let cause = `Product ID received: ${id}`;
            ErrorUtils.productIdRequiredError(cause);
        }
        try {
            const response = await this.productRepository.delete(id);
            if (response.deletedCount === 0) {
                throw new Error("Product not found");
            }
            const deletedProduct = await this.productRepository.getProductById(id);
            return deletedProduct;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error deleting product: ${error}`);
            let cause = `Product ID received: ${id}`;
            ErrorUtils.productDeleteError(cause);
        }
    };

    /**
     * Reduces an amount of stock from a product. If the amount is greater than the stock, throws an error.
     * @param {Number} id - Product id.
     * @param {Number} amount - Amount to reduce.
     * @returns {Number} - Amount reduced.
     */
    async reduceStock(id, amount) {
        if (!id) {
            let cause = `Product ID received: ${id}, Amount received: ${amount}`;
            ErrorUtils.productIdRequiredError(cause);
        }
        if (!amount) {
            let cause = `Product ID received: ${id}, Amount received: ${amount}`;
            ErrorUtils.productAmountRequiredError(cause);
        }
        try {
            const product = await this.productRepository.getProductById(id);
            if (product.stock < amount) {
                throw new Error("Not enough stock");
            }
            const newStock = product.stock - amount;
            const response = await this.productRepository.updateProduct(id, { stock: newStock } );
            if (response.matchedCount === 0) {
                throw new Error("Product not found");
            }
            return amount;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error reducing stock: ${error}`);
            let cause = `Product ID received: ${id}, Amount received: ${amount}`;
            ErrorUtils.productModifyError(cause);
        }
    };
};

/* Exports */

export default ProductService;