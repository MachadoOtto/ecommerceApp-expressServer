/* Ecommerce Server - Final Project */
// Archive: passwordToken.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";

/* Schema Model */

const passwordTokenCollection = "tokens";

const passwordTokenSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '1h' 
    }
});

const passwordTokenModel = mongoose.model(passwordTokenCollection, passwordTokenSchema);

/* Exports */

export default passwordTokenModel;