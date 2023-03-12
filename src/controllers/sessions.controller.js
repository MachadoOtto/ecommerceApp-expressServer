/* Ecommerce Server - Final Project */
// Archive: sessions.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import SessionService from '../services/sessions.services.js';
import CartService from '../services/carts.services.js';

/* Main Controller Logic */

class SessionController {
    // Register a new user
    static async registerUser(req, res) {
        try {
            let { email, password, first_name, last_name, age } = req.body;
            if (!email || !password || !first_name || !last_name || !age || (email.trim().toLowerCase() === 'admincoder@coder.com')) {
                res.redirect('/register?error=1');
            } else {
                let cart = await CartService.createCart();
                await SessionService.addUser( { email, password, first_name, last_name, age, cart: cart._id, role: 'User' } );
                res.redirect('/login?success=1');
            }
        } catch (error) {
            res.redirect('/register?error=1');
        }
    };

    // Login a user
    static async loginUser(req, res) {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                res.redirect('/login?error=1');
            } else {
                // Check for hardcoded admin user
                if ((email.trim().toLowerCase() === 'admincoder@coder.com') && password === 'adminCod3r123' ) {
                    let user = {
                        email: 'adminCoder@coder.com',
                        first_name: 'Admin',
                        last_name: 'Coder',
                        age: 99,
                        cart: '63fd86a4b7d2f9f29c24a07e',
                        role: 'Admin'
                    };
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    let user = await SessionService.getUserByEmail(email);
                    if (user) {
                        if (user.password === password) {
                            delete user.password;
                            req.session.user = user;
                            res.redirect('/');
                        } else {
                            res.redirect('/login?error=1');
                        }
                    } else {
                        res.redirect('/login?error=1');
                    }
                }
            }
        } catch (error) {
            res.redirect('/login?error=1');
        }
    };

    // Logout a user
    static async logoutUser(req, res) {
        try {
            req.session.destroy();
            res.redirect('/login');
        } catch (error) {
            res.redirect('/');
        }
    };

    // Get user cart value
    static async getUserCart(req, res) {
        let user = req.session.user;
        if (user) {
            res.send(user.cart);
        } else {
            res.status(401).send('Unauthorized');
        }
    };
};

/* Exports */

export default SessionController;