/* Ecommerce Server - Final Project */
// Archive: ticket.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: new Date()
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    purchased_products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number
            }
        }],
        default: []
    }
});

ticketSchema.pre("find", function () {
    this.populate("purchaser");
    this.populate("purchased_products.product");
});

ticketSchema.pre("findOne", function () {
    this.populate("purchaser");
    this.populate("purchased_products.product");
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

/* Exports */

export default ticketModel;