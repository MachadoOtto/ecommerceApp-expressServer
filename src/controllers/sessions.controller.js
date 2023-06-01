/* Ecommerce Server - Final Project */
// Archive: sessions.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import SessionService from '../services/sessions.service.js';
import TicketService from '../services/tickets.service.js';
import NodemailerTransporter from "../config/nodemailer.config.js";

/* Main Controller Logic */

const sessionService = new SessionService();
const ticketService = new TicketService();
const nodemailerTransporter = new NodemailerTransporter();

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
            req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
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
                let user = await sessionService.getUserByEmail(session.email);
                delete user.password;
                res.send(user);
            } catch (err) {
                req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    };

    // Get logged user tickets
    static async getUserTickets(req, res) {
        let session = req.session.user;
        if (session) {
            try {
                let tickets = await ticketService.getTicketsByPurchaserId(session._id);
                res.send( { status: 'success', data: tickets } );
            } catch (err) {
                req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the tickets.' } );
            }
        } else {
            res.status(401).send( { status: 'error', message: 'Unauthorized: You must be logged in to access this resource.' } );
        }
    };

    // Send password reset email
    // Shows to user a success message even if the email does not exist in the database (for security reasons)
    static async resetPasswordEmail(req, res) {
        let { email } = req.body;
        try {
            const passwordToken = await sessionService.generatePasswordToken(email);
            if (passwordToken) {
                await nodemailerTransporter.sendEmailPasswordToken(email, passwordToken.token);
            }
            res.redirect('/passwordReset?success=1');            
        } catch (err) {
            req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.redirect('/passwordReset?success=1');
        }
    };

    // Changes user password using a valid (not expired) password token
    static async changePassword(req, res) {
        let { token, password } = req.body;
        try {
            const passwordToken = await sessionService.getPasswordToken(token);
            if (passwordToken) {
                await sessionService.changePassword(passwordToken.userId, password);
                await sessionService.deletePasswordToken(token);
                res.redirect('/login?changePasswordSuccess=1');
            } else {
                res.redirect('/login?changePasswordError=1');
            }
        } catch (err) {
            req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.redirect('/login?changePasswordError=1');
        }
    };

    // User change role between premium and user using the users id
    static async changeUserRole(req, res) {
        let id = req.params.id;
        try {
            const user = await sessionService.changeRole(id);
            res.send( { status: 'success', data: user } );
        } catch (err) {
            req.logger.warning(`[SessionController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to change the user role.' } );
        }
    };
};

/* Exports */

export default SessionController;