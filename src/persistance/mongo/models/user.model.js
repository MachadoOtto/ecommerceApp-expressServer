/* Ecommerce Server - Final Project */
// Archive: user.model.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const userCollection = "users";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: "User"
    },
    documents: [{
        name: {
            type: String
        },
        reference: {
            type: String
        },
        status: {
            type: String,
            default: "Pending"
        }
    }],
    last_connection: {
        type: Date
    }
});

const userModel = mongoose.model(userCollection, userSchema);

/* Exports */

export default userModel;