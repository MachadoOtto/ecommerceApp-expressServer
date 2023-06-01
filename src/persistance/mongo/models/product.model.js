/* Ecommerce Server - Final Project */
// Archive: product.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/* Schema Model */

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: [{
        type: String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    }
});

productSchema.plugin(mongoosePaginate);

productSchema.pre("find", function () {
    this.populate("owner", "email");
});

productSchema.pre("findOne", function () {
    this.populate("owner", "email");
});

const productModel = mongoose.model(productCollection, productSchema);

/* Exports */

export default productModel;