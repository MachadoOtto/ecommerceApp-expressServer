/* Ecommerce Server - Final Project */
// Archive: product.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Entity Class */

class Product {
    constructor( {_id, title, description, price, code, status, stock, category, thumbnails, owner = null} ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
        this.owner = this.owner = {
            _id: (owner) ? owner._id : null,
            email: (owner) ? owner.email : null
        };
    };
};

/* Exports */

export default Product;