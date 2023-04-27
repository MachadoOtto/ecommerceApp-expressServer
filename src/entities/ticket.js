/* Ecommerce Server - Final Project */
// Archive: ticket.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */
import User from "./user.js";
import Product from "./product.js";

/* Entity Class */

class Ticket {
    constructor( {_id, code, purchase_datetime, amount, purchaser, purchased_products} ) {
        this._id = _id;
        this.code = code;
        this.purchase_datetime = purchase_datetime;
        this.amount = amount;
        this.purchaser = new User(purchaser);
        this.purchased_products = purchased_products.map((p) => {
            return {
                product: new Product(p.product),
                quantity: p.quantity
            };
        });
    };
};

/* Exports */

export default Ticket;