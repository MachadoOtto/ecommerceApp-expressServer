/* Ecommerce Server - Final Project */
// Archive: views.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductService from '../services/products.service.js';
import CartService from '../services/carts.service.js';
import TicketService from '../services/tickets.service.js';

/* Main Controller Logic */

const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();

class ViewController {
    // Home Page. Displays all products contained in the database.
    static async getHome(req, res) {
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        res.render('home', { user, isAdmin });
    };

    // Real Time Products Page. Displays all products contained in the database in real time.
    // Uses Socket.io to update the page when a new product is added to the database.
    static async getRealTimeProducts(req, res) {
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        res.render('realTimeProducts', { user, isAdmin });
    };

    // Products Page. Displays all products contained in the database with pagination.
    static async getProducts(req, res) {
        let { page } = req.query;
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        page = (parseInt(page) > 0) ? parseInt(page) : 1;
        let productsList = await productService.getProducts(10, page);
        let products = productsList.products;
        let info = {
            totalPages: productsList.totalPages,
            prevPage: productsList.prevPage,
            nextPage: productsList.nextPage,
            page: productsList.page,
            hasPrevPage: productsList.hasPrevPage,
            hasNextPage: productsList.hasNextPage,
            prevLink: (productsList.hasPrevPage) ? `/api/products?page=${productsList.prevPage}` : null,
            nextLink: (productsList.hasNextPage) ? `/api/products?page=${productsList.nextPage}` : null
        };
        res.render('products', { products, info, user, isAdmin });
    };

    // Product Detail Page. Displays the details of a specific product.
    static async getProductDetail(req, res) {
        let { pid } = req.params;
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        try {
            let product = await productService.getProductById(pid);
            if (product === null) {
                res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist.", user, isAdmin });
            } else {
                res.render('productDetail', { product, user, isAdmin });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist.", user, isAdmin });
        }
    };

    // Cart Page. Displays the details of a specific cart.
    static async getCart(req, res) {
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        try {
            let cart = await cartService.getCart(user.cart);
            if (cart === null) {
                res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist.", user, isAdmin });
            } else {
                res.render('cart', { cart, user, isAdmin});
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist.", user, isAdmin });
        }
    };

    // Chat Page. Displays a chat room.
    static async getChat(req, res) {
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        res.render('chat', { user, isAdmin });
    };

    // Login Page. Displays a login form.
    static async getLogin(req, res) {
        let { success, error } = req.query;
        if (success === '1') {
            res.render('login', { success });
        } else if (error === '1') {
            res.render('login', { error });
        } else {
            res.render('login');
        }
    };

    // Register Page. Displays a register form.
    static async getRegister(req, res) {
        let { error } = req.query;
        if (error) {
            res.render('register', { error });
        } else {
            res.render('register');
        }
    };

    // Profile Page.
    static async getProfile(req, res) {
        let user = req.session.user;
        if (user) {
            let isAdmin = (user.role === 'Admin') ? true : false;
            res.render('profile', { user, isAdmin });
        } else {
            res.render('error', { code: 404, message: "Not Found: User profile not found.", user, isAdmin });
        }
    };

    // Tickets dashboard.
    static async getTickets(req, res) {
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin');
        }
        try {
            let tickets = await ticketService.getTicketsByPurchaserId(user._id);
            res.render('tickets', { tickets, user, isAdmin });
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: User tickets not found.", user, isAdmin });
        }
    };
    
    // Ticket detail page.
    static async getTicketDetail(req, res) {
        let { code } = req.params;
        let user = req.session.user;
        let isAdmin = false;
        if (user) {
            isAdmin = (user.role === 'Admin');
        }
        try {
            let ticket = await ticketService.getTicketByCode(code);
            if (ticket === null) {
                res.render('error', { code: 404, message: "Not Found: The ticket with the specified code does not exist.", user, isAdmin });
            } else {
                res.render('ticketDetail', { ticket, user, isAdmin });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The ticket with the specified code does not exist.", user, isAdmin });
        }
    };
};

/* Exports */

export default ViewController;