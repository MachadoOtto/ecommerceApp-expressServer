/* Ecommerce Server - Final Project */
// Archive: views.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductService from '../services/products.services.js';
import CartService from '../services/carts.services.js';

/* Main Controller Logic */

class ViewController {
    // Home Page. Displays all products contained in the database.
    static async getHome(req, res) {
        let { page } = req.query;
        page = (parseInt(page) > 0) ? parseInt(page) : 1;
        let dbRes = await ProductService.getProducts(10, page);
        let products = JSON.parse(JSON.stringify(dbRes.docs));
        let info = {
            totalPages: dbRes.totalPages,
            prevPage: dbRes.prevPage,
            nextPage: dbRes.nextPage,
            page: dbRes.page,
            hasPrevPage: dbRes.hasPrevPage,
            hasNextPage: dbRes.hasNextPage,
            prevLink: (dbRes.hasPrevPage) ? `/api/products?page=${dbRes.prevPage}` : null,
            nextLink: (dbRes.hasNextPage) ? `/api/products?page=${dbRes.nextPage}` : null
        };
        res.render('home', { products, info });
    };

    // Real Time Products Page. Displays all products contained in the database in real time.
    // Uses Socket.io to update the page when a new product is added to the database.
    static async getRealTimeProducts(req, res) {
        res.render('realTimeProducts');
    };

    // Products Page. Displays all products contained in the database with pagination.
    static async getProducts(req, res) {
        let { page } = req.query;
        page = (parseInt(page) > 0) ? parseInt(page) : 1;
        let dbRes = await ProductService.getProducts(10, page);
        let products = JSON.parse(JSON.stringify(dbRes.docs));
        let info = {
            totalPages: dbRes.totalPages,
            prevPage: dbRes.prevPage,
            nextPage: dbRes.nextPage,
            page: dbRes.page,
            hasPrevPage: dbRes.hasPrevPage,
            hasNextPage: dbRes.hasNextPage,
            prevLink: (dbRes.hasPrevPage) ? `/api/products?page=${dbRes.prevPage}` : null,
            nextLink: (dbRes.hasNextPage) ? `/api/products?page=${dbRes.nextPage}` : null
        };
        res.render('products', { products, info });
    };

    // Product Detail Page. Displays the details of a specific product.
    static async getProductDetail(req, res) {
        let { pid } = req.params;
        try {
            let product = await ProductService.getProductById(pid);
            if (product === null) {
                res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist." });
            } else {
                res.render('productDetail', { product });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist." });
        }
    };

    // Cart Page. Displays the details of a specific cart.
    static async getCart(req, res) {
        let { cid } = req.params;
        try {
            let cart = await CartService.getCart(cid);
            if (cart === null) {
                res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist." });
            } else {
                res.render('cart', { cart });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist." });
        }
    };

    // Chat Page. Displays a chat room.
    static async getChat(req, res) {
        res.render('chat');
    };
}

/* Exports */

export default ViewController;