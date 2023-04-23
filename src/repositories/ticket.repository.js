/* Ecommerce Server - Final Project */
// Archive: ticket.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import Ticket from "../entities/ticket.js";

/* Main Repository Logic */

class TicketRepository {
    constructor() {
        this.dao = FactoryDAO.getTicketDAO(Config.getDao());
    };

    /**
     * Creates a new ticket.
     * @param {*} data
     * @returns {Ticket} The new ticket.
     */
    async create(data) {
        try {
            const ticketDTO = await this.dao.create(data);
            return new Ticket(ticketDTO);
        } catch (error) {
            console.log(`[DEBUG][TicketRepository] Error creating ticket: ${error}`);
            throw new Error("Error creating ticket");
        }
    };

    /**
     * Returns all tickets in the database.
     * @returns {Ticket[]} An array of tickets.
     */
    async getAll() {
        try {
            const ticketDTOs = await this.dao.getAll();
            const tickets = ticketDTOs.map(ticketDTO => new Ticket(ticketDTO));
            return tickets;
        } catch (error) {
            console.log(`[DEBUG][TicketRepository] Error getting all tickets: ${error}`);
            throw new Error("Error getting all tickets");
        }
    };

    /**
     * Returns a ticket by id.
     * @param {String} id
     * @returns {Ticket} The ticket with the given id.
     */
    async getById(id) {
        try {
            const ticketDTO = await this.dao.getById(id);
            return new Ticket(ticketDTO);
        } catch (error) {
            console.log(`[DEBUG][TicketRepository] Error getting ticket by id: ${error}`);
            throw new Error("Error getting ticket by id");
        }
    };

    /**
     * Returns a ticket by code.
     * @param {String} code
     * @returns {Ticket} The ticket with the given code.
     */
    async getByCode(code) {
        try {
            const ticketDTO = await this.dao.getByCode(code);
            return new Ticket(ticketDTO);
        } catch (error) {
            console.log(`[DEBUG][TicketRepository] Error getting ticket by code: ${error}`);
            throw new Error("Error getting ticket by code");
        }
    };

    /**
     * Returns all tickets by the purchaserId.
     * @param {String} purchaserId
     * @returns {Ticket[]} An array of tickets.
     */
    async getByPurchaserId(purchaserId) {
        try {
            const ticketDTOs = await this.dao.getByPurchaserId(purchaserId);
            const tickets = ticketDTOs.map(ticketDTO => new Ticket(ticketDTO));
            return tickets;
        } catch (error) {
            console.log(`[DEBUG][TicketRepository] Error getting tickets by purchaser id: ${error}`);
            throw new Error("Error getting tickets by purchaser id");
        }
    };
};

/* Exports */

export default TicketRepository;