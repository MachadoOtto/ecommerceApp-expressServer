/* Ecommerce Server - Final Project */
// Archive: Cart.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class Cart */

class Cart {
    constructor(id) {
        this.id = id; // unique id
        this.products = []; // array of products
    }

    /**
     * Returns a new `Cart` object with the data from a valid JSON object.
     * @param {Object} json Object with the `Cart` class format.
     * @returns {Cart} A new `Cart` object.
     */
    static fromJSON(json) {
        return new Cart(json.id, json.products);
    }

    /**
     * Formats the `Cart` object data into a string.
     * @returns {String} A string with the `Cart` object data.
     */
    toString() {
        return `ID: ${this.id} =>
        Products: ${this.products}`;
    }
}

/* Exports */

export default Cart;