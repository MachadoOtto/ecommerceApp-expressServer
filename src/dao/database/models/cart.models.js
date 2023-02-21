/* Ecommerce Server - Final Project */
// Archive: cart.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
});

const cartModel = mongoose.model(cartCollection, cartSchema);

/* Exports */

export default cartModel;