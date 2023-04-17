/* Ecommerce Server - Final Project */
// Archive: products.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductRepository from "../repositories/product.repository.js";
import Product from "../entities/product.js";

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
            console.log(`[DEBUG][ProductService] Error getting products: ${error}`);
            throw new Error("Error getting products");
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
            throw new Error("Error getting all products");
        }
    };

    /**
     * Returns a product from database, based on the id parameter.
     * @param {Number} id - Product id.
     * @returns {Promise<ProductModel>} - Product object.
     */
    async getProductById(id) {
        if (!id) {
            throw new Error("Product id is required");
        }
        try {
            const product = await this.productRepository.getProductById(id);
            return product;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error getting product by id: ${error}`);
            throw new Error("Error getting product by id");
        }
    };

    /**
     * Adds a new product to the database.
     * @param {Object} product - Product object. 
     * @returns {Promise<Product>} - Product object added to the database.
     */
    async addProduct(product) {
        if (!product) {
            throw new Error("Product is required");
        }
        try {
            const newProduct = await this.productRepository.create(product);
            return newProduct;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error adding product: ${error}`);
            throw new Error("Error adding product");
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
            throw new Error("Product id is required");
        }
        if (!updateFields) {
            throw new Error("Update fields are required");
        }
        try {
            const response = await this.productRepository.update(id, updateFields);
            if (response.matchedCount === 0) {
                throw new Error("Product not found");
            }
            const updatedProduct = await this.productRepository.getProductById(id);
            return updatedProduct;
        } catch (error) {
            console.log(`[DEBUG][ProductService] Error updating product: ${error}`);
            throw new Error("Error updating product");
        }
    };

    /**
     * Deletes a product from the database.
     * @param {Number} id - Product id.
     * @returns {Object} - Database response.
     */
    async deleteProduct(id) {
        if (!id) {
            throw new Error("Product id is required");
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
            throw new Error("Error deleting product");
        }
    };
};

/* Exports */

export default ProductService;