/* Desafio entregable: Servidor con Express */
// Archivo: Cart.js
// Autor: Jorge Machado Ottonelli
// CoderHouse - Curso: Programación Backend

/* Class Cart */

class Cart {
    constructor(id, products) {
        this.id = id; // unique id
        this.products = products; // array of products
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

module.exports = Cart;