/* Ecommerce Server - Final Project */
// Archive: tickets.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import TicketRepository from "../repositories/ticket.repository.js";
import Ticket from "../entities/ticket.js";
import ProductService from "./products.service.js";
import CartService from "./carts.service.js";
import { generateUUID } from "../utils/uuid.utils.js";
import ErrorUtils from "./errors/utils.error.js";
import Logger from "../config/logger.config.js";

/* Main Service Logic */

const log = new Logger();

/* Services */

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
        this.productService = new ProductService();
        this.cartService = new CartService();
    };

    /**
     * Creates a new ticket instance.
     * @returns {Promise<Ticket>} The created ticket.
     */
    async createTicket( { purchaser, cart } ) {
        if (!purchaser || !cart) {
            let cause = `Purchaser received: ${purchaser}, Cart received: ${cart}`;
            if (!purchaser) {
                ErrorUtils.userIdRequiredError(cause);
            } else {
                ErrorUtils.cartIdRequiredError(cause);
            }
        }
        try {
            const code = generateUUID();
            const purchase_datetime = new Date();
            const purchased_products = cart.products.filter( p => {
                try {
                    this.productService.reduceStock(p.product._id, p.quantity);
                    this.cartService.removeProduct(cart._id, p.product._id);
                    return true;
                } catch (error) {
                    return false;
                }
            });
            const amount = purchased_products.reduce( (acc, p) => acc + p.product.price * p.quantity, 0 );
            const ticketEntity = this.ticketRepository.create( { code, purchase_datetime, amount, purchaser, purchased_products } );
            return ticketEntity;
        } catch (error) {
            log.logger.debug(`[TicketService] Error creating ticket: ${error}`);
            let cause = `Purchaser received: ${purchaser}, Cart received: ${cart}`;
            ErrorUtils.ticketCreateError(cause);
        }
    };

    /**
     * Returns all tickets from database.
     * @returns {Promise<Ticket[]>} All tickets from database.
     */
    async getTickets() {
        try {
            const tickets = this.ticketRepository.getAll();
            return tickets;
        } catch (error) {
            log.logger.debug(`[TicketService] Error getting all tickets: ${error}`);
            ErrorUtils.ticketNotFound(error);
        }
    };

    /**
     * Returns the ticket with the specified ID.
     * @param {String} id The ticket ID.
     * @returns {Promise<Ticket>} The ticket with the specified ID.
     */
    async getTicket(id) {
        if (!id) {
            let cause = `Ticket ID received: ${id}`;
            ErrorUtils.ticketIdRequiredError(cause);
        }
        try {
            const ticket = this.ticketRepository.getById(id);
            return ticket;
        } catch (error) {
            log.logger.debug(`[TicketService] Error getting ticket by id: ${error}`);
            let cause = `Ticket ID received: ${id}`;
            ErrorUtils.ticketNotFound(cause);
        }
    };

    /**
     * Returns the ticket with the specified code.
     * @param {String} code The ticket code.
     * @returns {Promise<Ticket>} The ticket with the specified code.
     */
    async getTicketByCode(code) {
        if (!code) {
            let cause = `Ticket Code received: ${code}`;
            ErrorUtils.ticketCodeRequiredError(cause);
        }
        try {
            const ticket = this.ticketRepository.getByCode(code);
            return ticket;
        } catch (error) {
            log.logger.debug(`[TicketService] Error getting ticket by code: ${error}`);
            let cause = `Ticket Code received: ${code}`;
            ErrorUtils.ticketNotFound(cause);
        }
    };

    /**
     * Returns all tickets from the specified purchaserId.
     * @param {String} purchaserId The purchaser ID.
     * @returns {Promise<Ticket[]>} All tickets from the specified purchaserId.
     */
    async getTicketsByPurchaserId(purchaserId) {
        if (!purchaserId) {
            let cause = `Purchaser ID received: ${purchaserId}`;
            ErrorUtils.userIdRequiredError(cause);
        }
        try {
            const tickets = this.ticketRepository.getByPurchaserId(purchaserId);
            return tickets;
        } catch (error) {
            log.logger.debug(`[TicketService] Error getting tickets by purchaserId: ${error}`);
            let cause = `Purchaser ID received: ${purchaserId}`;
            ErrorUtils.ticketNotFound(cause);
        }
    };
};

/* Exports */

export default TicketService;