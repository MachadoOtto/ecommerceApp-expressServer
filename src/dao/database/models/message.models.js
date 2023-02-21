/* Ecommerce Server - Final Project */
// Archive: message.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const messageModel = mongoose.model(messageCollection, messageSchema);

/* Exports */

export default messageModel;