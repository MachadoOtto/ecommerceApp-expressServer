/* Ecommerce Server - Final Project */
// Archive: cart.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: String
            },
            quantity: {
                type: Number
            }
        }],
        default: []
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

/* Exports */

export default cartModel;