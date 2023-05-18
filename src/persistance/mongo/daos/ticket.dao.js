/* Ecommerce Server - Final Project */
// Archive: ticket.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import TicketModel from "../models/ticket.model.js";
import TicketDTO from "../../../dtos/ticket.dto.js";
import Logger from "../../../config/logger.config.js";

/* Main DAO Logic */

const log = new Logger();

class MongoDBTicketDAO {
    /**
     * Create a new ticket in the database.
     * @returns {Promise<TicketDTO>} - Ticket DTO.
     */
    async create( { code, purchase_datetime, amount, purchaser, purchased_products } ) {
        try {
            const newTicket = await TicketModel.create( { code, purchase_datetime, amount, purchaser, purchased_products } );
            const ticketDTO = new TicketDTO(newTicket);
            return ticketDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBTicketDAO] Error creating ticket: ${error}`);
            throw new Error("Error creating ticket");
        }
    };

    /**
     * Get all tickets from the database.
     * @returns {Promise<TicketDTO[]>} - Ticket DTO array.
     */
    async getAll() {
        try {
            const tickets = await TicketModel.find().lean();
            const ticketDTOs = tickets.map(ticket => new TicketDTO(ticket));
            return ticketDTOs;
        } catch (error) {
            log.logger.debug(`[MongoDBTicketDAO] Error getting all tickets: ${error}`);
            throw new Error("Error getting all tickets");
        }
    };

    /**
     * Get a ticket from the database using its ID.
     * @param {String} id - Ticket ID.
     * @returns {Promise<TicketDTO>} - Ticket DTO.
     */
    async getById(id) {
        try {
            const ticket = await TicketModel.findById(id).lean();
            const ticketDTO = new TicketDTO(ticket);
            return ticketDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBTicketDAO] Error getting ticket by id: ${error}`);
            throw new Error("Error getting ticket by id");
        }
    };

    /**
     * Get a ticket from the database using its code.
     * @param {String} code - Ticket code.
     * @returns {Promise<TicketDTO>} - Ticket DTO.
     */
    async getByCode(code) {
        try {
            const ticket = await TicketModel.findOne({ code: code }).lean();
            const ticketDTO = new TicketDTO(ticket);
            return ticketDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBTicketDAO] Error getting ticket by code: ${error}`);
            throw new Error("Error getting ticket by code");
        }
    };

    /**
     * Get all tickets from the database using its purchaser ID.
     * @param {String} purchaserId - Purchaser ID.
     * @returns {Promise<TicketDTO[]>} - Ticket DTO array.
     */
    async getByPurchaserId(purchaserId) {
        try {
            const tickets = await TicketModel.find({ purchaser: purchaserId }).lean();
            const ticketDTOs = tickets.map(ticket => new TicketDTO(ticket));
            return ticketDTOs;
        } catch (error) {
            log.logger.debug(`[MongoDBTicketDAO] Error getting tickets by purchaser id: ${error}`);
            throw new Error("Error getting tickets by purchaser id");
        }
    };
};

/* Exports */

export default MongoDBTicketDAO;