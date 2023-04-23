/* Ecommerce Server - Final Project */
// Archive: sessions.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import SessionService from '../services/sessions.service.js';
import TicketService from '../services/tickets.service.js';

/* Main Controller Logic */

const sessionService = new SessionService();
const ticketService = new TicketService();

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
            console.log(`[DEBUG][SessionController] Error in logoutUser: ${error.message}`);
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
            } catch (error) {
                res.status(500).send('Internal Server Error');
                console.log(`[DEBUG][SessionController] Error in getUserInSession: ${error.message}`)
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
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the tickets.' } );
                console.log(`[DEBUG][TicketController] Error in getUserTickets: ${err.message}`);
            }
        } else {
            res.status(401).send( { status: 'error', message: 'Unauthorized: You must be logged in to access this resource.' } );
        }
    };
};

/* Exports */

export default SessionController;