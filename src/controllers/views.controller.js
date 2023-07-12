/* Ecommerce Server - Final Project */
// Archive: views.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductService from '../services/products.service.js';
import CartService from '../services/carts.service.js';
import TicketService from '../services/tickets.service.js';
import SessionService from '../services/sessions.service.js';

/* Main Controller Logic */

const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();
const sessionService = new SessionService();

class ViewController {
    // Home Page. Displays all products contained in the database.
    static async getHome(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        res.render('home', { user, isAdmin, isPremium, isUser });
    };

    // Real Time Products Page. Displays all products contained in the database in real time.
    // Uses Socket.io to update the page when a new product is added to the database.
    static async getRealTimeProducts(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        res.render('realTimeProducts', { user, isAdmin, isPremium, isUser });
    };

    // Products Page. Displays all products contained in the database with pagination.
    static async getProducts(req, res) {
        let { page } = req.query;
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        user = await sessionService.getUserById(user._id);
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
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
        res.render('products', { products, info, user, isAdmin, isPremium, isUser });
    };

    // Product Detail Page. Displays the details of a specific product.
    static async getProductDetail(req, res) {
        let { pid } = req.params;
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        try {
            let product = await productService.getProductById(pid);
            if (product === null) {
                res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist.", user, isAdmin, isPremium, isUser });
            } else {
                res.render('productDetail', { product, user, isAdmin, isPremium, isUser });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The product with the specified ID does not exist.", user, isAdmin, isPremium, isUser });
        }
    };

    // Cart Page. Displays the details of a specific cart.
    static async getCart(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        try {
            let cart = await cartService.getCart(user.cart);
            if (cart === null) {
                res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist.", user, isAdmin, isPremium, isUser });
            } else {
                res.render('cart', { cart, user, isAdmin, isPremium, isUser});
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The cart with the specified ID does not exist.", user, isAdmin, isPremium, isUser });
        }
    };

    // Chat Page. Displays a chat room.
    static async getChat(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        if (user) {
            isAdmin = (user.role === 'Admin')
        }
        res.render('chat', { user, isAdmin, isPremium, isUser });
    };

    // Login Page. Displays a login form.
    static async getLogin(req, res) {
        let { success, error, changePasswordSuccess, changePasswordError } = req.query;
        if (success === '1') {
            res.render('login', { success });
        } else if (error === '1') {
            res.render('login', { error });
        } else if (changePasswordSuccess === '1') {
            res.render('login', { changePasswordSuccess });
        } else if (changePasswordError === '1') {
            res.render('login', { changePasswordError });
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
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        if (user) {
            let isAdmin = (user.role === 'Admin') ? true : false;
            let isPremium = (user.role === 'Premium') ? true : false;
            let isUser = (user.role === 'User') ? true : false;
            res.render('profile', { user, isAdmin, isPremium, isUser });
        } else {
            res.render('error', { code: 404, message: "Not Found: User profile not found.", user, isAdmin, isPremium, isUser });
        }
    };

    // Tickets dashboard.
    static async getTickets(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        try {
            let tickets = await ticketService.getTicketsByPurchaserId(user._id);
            res.render('tickets', { tickets, user, isAdmin, isPremium, isUser });
        } catch (err) {
            let tickets = [];
            res.render('tickets', { tickets, user, isAdmin, isPremium, isUser });
        }
    };
    
    // Ticket detail page.
    static async getTicketDetail(req, res) {
        let { code } = req.params;
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        try {
            let ticket = await ticketService.getTicketByCode(code);
            if (ticket === null) {
                res.render('error', { code: 404, message: "Not Found: The ticket with the specified code does not exist.", user, isAdmin, isPremium, isUser });
            } else {
                res.render('ticketDetail', { ticket, user, isAdmin, isPremium, isUser });
            }
        } catch (err) {
            res.render('error', { code: 404, message: "Not Found: The ticket with the specified code does not exist.", user, isAdmin, isPremium, isUser });
        }
    };

    // Password reset page.
    static async getPasswordReset(req, res) {
        let { success } = req.query;
        if (success === '1') {
            res.render('passwordReset', { success });
        } else {
            res.render('passwordReset');
        }
    };

    // Password change page. Only accessible to tokens with a valid reset token.
    static async getPasswordChange(req, res) {
        try {
            let { token } = req.params;
            let passwordToken = await sessionService.getPasswordToken(token);
            if (passwordToken === null) {
                res.redirect('/passwordReset');
            } else {
                res.render('passwordChange', { token });
            }
        } catch (err) {
            res.redirect('/passwordReset');
        }
    };

    // Uploads dashboard.
    static async getUploads(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        try {
            let uploads = user.documents;
            res.render('uploads', { uploads, user, isAdmin, isPremium, isUser });
        } catch (err) {
            let uploads = [];
            res.render('uploads', { uploads, user, isAdmin, isPremium, isUser });
        }
    };

    // User management dashboard.
    static async getUserManagement(req, res) {
        let user;
        try { 
            user = await sessionService.getUserById(req.session.user._id);
        } catch (err) {
            user = req.session.user;
        }
        let isAdmin = (user.role === 'Admin') ? true : false;
        let isPremium = (user.role === 'Premium') ? true : false;
        let isUser = (user.role === 'User') ? true : false;
        let users;
        try {
            users = await sessionService.getUsers();
            res.render('userAdministration', { users, user, isAdmin, isPremium, isUser });
        } catch (err) {
            users = [];
            res.render('userAdministration', { users, user, isAdmin, isPremium, isUser });
        }
    };
};

/* Exports */

export default ViewController;