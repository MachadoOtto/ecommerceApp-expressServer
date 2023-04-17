/* Ecommerce Server - Final Project */
// Archive: cart.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class CartDTO {
    constructor( {_id, products} ) {
        this._id = _id;
        this.products = products;
    };
};

/* Exports */

export default CartDTO;