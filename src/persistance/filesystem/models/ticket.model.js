/* Ecommerce Server - Final Project */
// Archive: ticket.model.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class TicketModel */

class TicketModel {
    constructor( {id, purchase_datetime, amount, purchaser, purchased_products} ) {
        this.id = id; // unique id
        this.purchase_datetime = purchase_datetime;
        this.amount = amount;
        this.purchaser = purchaser;
        this.purchased_products = purchased_products;
    }
};

/* Exports */

export default TicketModel;