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
            throw new Error("Purchaser and cart are required");
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
            console.log(`[DEBUG][TicketService] Error creating ticket: ${error}`);
            throw new Error("Error creating ticket");
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
            console.log(`[DEBUG][TicketService] Error getting all tickets: ${error}`);
            throw new Error("Error getting all tickets");
        }
    };

    /**
     * Returns the ticket with the specified ID.
     * @param {String} id The ticket ID.
     * @returns {Promise<Ticket>} The ticket with the specified ID.
     */
    async getTicket(id) {
        if (!id) {
            throw new Error("Ticket ID is required");
        }
        try {
            const ticket = this.ticketRepository.getById(id);
            return ticket;
        } catch (error) {
            console.log(`[DEBUG][TicketService] Error getting ticket by id: ${error}`);
            throw new Error("Error getting ticket by id");
        }
    };

    /**
     * Returns the ticket with the specified code.
     * @param {String} code The ticket code.
     * @returns {Promise<Ticket>} The ticket with the specified code.
     */
    async getTicketByCode(code) {
        if (!code) {
            throw new Error("Ticket code is required");
        }
        try {
            const ticket = this.ticketRepository.getByCode(code);
            return ticket;
        } catch (error) {
            console.log(`[DEBUG][TicketService] Error getting ticket by code: ${error}`);
            throw new Error("Error getting ticket by code");
        }
    };

    /**
     * Returns all tickets from the specified purchaserId.
     * @param {String} purchaserId The purchaser ID.
     * @returns {Promise<Ticket[]>} All tickets from the specified purchaserId.
     */
    async getTicketsByPurchaserId(purchaserId) {
        if (!purchaserId) {
            throw new Error("Purchaser ID is required");
        }
        try {
            const tickets = this.ticketRepository.getByPurchaserId(purchaserId);
            return tickets;
        } catch (error) {
            console.log(`[DEBUG][TicketService] Error getting tickets by purchaserId: ${error}`);
            throw new Error("Error getting tickets by purchaserId");
        }
    };
};

/* Exports */

export default TicketService;