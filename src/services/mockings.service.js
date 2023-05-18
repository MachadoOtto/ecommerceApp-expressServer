/* Ecommerce Server - Final Project */
// Archive: mockings.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { faker } from "@faker-js/faker";
import Product from "../entities/product.js";
import ErrorUtils from "./errors/utils.error.js";
import Logger from "../config/logger.config.js";

/* Main Service Logic */

const log = new Logger();

/* Services */

class MockingService {
    constructor() { };

    /**
     * Generates 100 products with random data, using the faker library.
     * @returns {Promise<Product[]>} - Array with 100 products.
     */
    async generateProducts() {
        try {
            const products = [];
            for (let i = 0; i < 100; i++) {
                const product = new Product({
                    _id: faker.database.mongodbObjectId(),
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    code: faker.datatype.string(6),
                    status: faker.datatype.boolean(),
                    stock: faker.datatype.number(100),
                    category: faker.commerce.department(),
                    image: faker.image.imageUrl()
                });
                products.push(product);
            };
            return products;
        } catch (error) {
            log.logger.debug(`[MockingService] Error generating products: ${error}`);
            ErrorUtils.mockingError(error);
        }
    };
};

/* Exports */

export default MockingService;