/* Ecommerce Server - Final Project */
// Archive: mockings.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MockingService from "../services/mockings.service.js";

/* Main Controller Logic */

const mockingService = new MockingService();

class MockingController {
    // Generates 100 products with random data, using the faker library.
    static async generateProducts(req, res) {
        try {
            let products = await mockingService.generateProducts();
            let response = {
                status: 'success',
                payload: products,
            };
            res.send(response);
        } catch (err) {
            req.logger.warning(`[MockingController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: "Internal Server Error: An error ocurred while trying to get the product list." });
        }
    };
};

/* Exports */

export default MockingController;