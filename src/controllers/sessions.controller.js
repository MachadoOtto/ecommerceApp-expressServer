/* Ecommerce Server - Final Project */
// Archive: sessions.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import SessionService from '../services/sessions.services.js';

/* Main Controller Logic */

class SessionController {
    // Login a user
    static async loginUser(req, res) {
        if (req.user) {
            req.session.user = req.user;
            res.redirect('/');
        } else {
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

    // Get the session user
    static async getUserInSession(req, res) {
        let session = req.session.user;
        if (session) {
            try {
                let user = await SessionService.getUserByEmail(session.email);
                delete user.password;
                res.send(user);
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    };
};

/* Exports */

export default SessionController;