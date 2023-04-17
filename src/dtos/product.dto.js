/* Ecommerce Server - Final Project */
// Archive: product.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class ProductDTO {
    constructor( {_id, title, description, price, code, status, stock, category, thumbnails} ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    };
};

/* Exports */

export default ProductDTO;