/* Ecommerce Server - Final Project */
// Archive: views.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductService from '../services/products.services.js';

/* Main Controller Logic */

class ViewController {
    // Home Page. Displays all products contained in the database.
    static async getHome(req, res) {
        let products = await ProductService.getProducts();
        res.render('home', { products });
    };

    // Real Time Products Page. Displays all products contained in the database in real time.
    // Uses Socket.io to update the page when a new product is added to the database.
    static async getRealTimeProducts(req, res) {
        res.render('realTimeProducts');
    };

    static async getChat(req, res) {
        res.render('chat');
    };
}

/* Exports */

export default ViewController;