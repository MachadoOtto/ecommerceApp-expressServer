/* Ecommerce Server - Final Project */
// Archive: ticket.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class TicketDTO {
    constructor( {_id, code, purchase_datetime, amount, purchaser, purchased_products} ) {
        this._id = _id;
        this.code = code;
        this.purchase_datetime = purchase_datetime;
        this.amount = amount;
        this.purchaser = purchaser;
        this.purchased_products = purchased_products;
    };
};

/* Exports */

export default TicketDTO;