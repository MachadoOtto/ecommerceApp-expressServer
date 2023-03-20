/* Ecommerce Server - Final Project */
// Archive: sessions.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

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
};

/* Exports */

export default SessionController;