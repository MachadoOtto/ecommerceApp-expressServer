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

cartSchema.pre("find", function () {
    this.populate("products.product");
});

cartSchema.pre("findOne", function () {
    this.populate("products.product");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

/* Exports */

export default cartModel;