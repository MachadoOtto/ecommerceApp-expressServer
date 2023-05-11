/* Ecommerce Server - Final Project */
// Archive: tickets.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import TicketService from "../services/tickets.service.js";

/* Main Controller Logic */

const ticketService = new TicketService();

class TicketController {
    // Returns all tickets from database.
    static async getTickets(req, res) {
        try {
            let tickets = await ticketService.getTickets();
            res.send( { status: 'success', data: tickets });
        } catch (err) {
            console.log(`[ERR][TicketController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the tickets.' } );
        }
    };

    // Returns the ticket with the specified ID. If the ticket doesn't exist, it returns an error.
    static async getTicket(req, res) {
        let { id } = req.params;
        try {
            let ticket = await ticketService.getTicket(id);
            if (ticket === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The ticket with the specified ID does not exist.' } );
            } else {
                res.send( { status: 'success', data: ticket } );
            }
        } catch (err) {
            console.log(`[ERR][TicketController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            if (err.name === 'CastError') {
                res.status(400).send( { status: 'error', message: 'Bad Request: The specified ID is not valid.' } );
            } else {
                res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the ticket.' } );
            }
        }
    };

    // Returns the ticket with the specified code. If the ticket doesn't exist, it returns an error.
    static async getTicketByCode(req, res) {
        let { code } = req.params;
        try {
            let ticket = await ticketService.getTicketByCode(code);
            if (ticket === null) {
                res.status(404).send( { status: 'error', message: 'Not Found: The ticket with the specified code does not exist.' } );
            } else {
                res.send( { status: 'success', data: ticket } );
            }
        } catch (err) {
            console.log(`[ERR][TicketController]\n\t${err.name}: ${err.message}\n\tCause: ${err.cause}\n\tError Code: ${err.code}`);
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to retrieve the ticket.' } );
        }
    };
};

/* Exports */

export default TicketController;