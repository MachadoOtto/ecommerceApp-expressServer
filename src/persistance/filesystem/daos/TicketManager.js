/* Ecommerce Server - Final Project */
// Archive: TicketManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import Ticket from '../models/ticket.model.js';
import TicketDTO from '../../../dtos/ticket.dto.js';
import Logger from '../../../config/logger.config.js';

/* Main Logic */

const log = new Logger();

/* Class TicketManager */

class TicketManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of tickets.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, JSON.stringify({ lastId: this.#lastId, tickets: [] }, null, '\t'));
        } else {
            // If the file exists, the lastId is read from it.
            let ticketMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = ticketMngrObj.lastId;
        }
    };

    /**
     * Create a new ticket in the database.
     * @returns {Promise<TicketDTO>} - Ticket DTO.
     */
    async create( { code, purchase_datetime, amount, purchaser, purchased_products } ) {
        try {
            const newTicket = new Ticket(++this.#lastId, code, purchase_datetime, amount, purchaser, purchased_products);
            const tickets = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).tickets;
            tickets.push(newTicket);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, tickets: tickets }, null, '\t'));
            const ticketDTO = new TicketDTO(newTicket);
            return ticketDTO;
        } catch (error) {
            --this.#lastId;
            log.logger.debug(`[TicketManager] Error creating ticket: ${error}`);
            throw new Error("Error creating ticket");
        }
    };

    /**
     * Get all tickets from the database.
     * @returns {Promise<TicketDTO[]>} - Ticket DTO array.
     */
    async getAll() {
        try {
            const tickets = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).tickets;
            const ticketDTOs = tickets.map(ticket => new TicketDTO(ticket));
            return ticketDTOs;
        } catch (error) {
            log.logger.debug(`[TicketManager] Error getting all tickets: ${error}`);
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
            const tickets = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).tickets;
            const ticket = tickets.find(ticket => ticket.id == id);
            const ticketDTO = new TicketDTO(ticket);
            return ticketDTO;
        } catch (error) {
            log.logger.debug(`[TicketManager] Error getting ticket by id: ${error}`);
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
            const tickets = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).tickets;
            const ticket = tickets.find(ticket => ticket.code == code);
            const ticketDTO = new TicketDTO(ticket);
            return ticketDTO;
        } catch (error) {
            log.logger.debug(`[TicketManager] Error getting ticket by code: ${error}`);
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
            const tickets = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).tickets;
            const purchaser_tickets = tickets.filter(ticket => ticket.purchaser.id == purchaserId);
            const ticketDTOs = purchaser_tickets.map(ticket => new TicketDTO(ticket));
            return ticketDTOs;
        } catch (error) {
            log.logger.debug(`[TicketManager] Error getting tickets by purchaser id: ${error}`);
            throw new Error("Error getting tickets by purchaser id");
        }
    };
};

/* Exports */

export default TicketManager;