/* Ecommerce Server - Final Project */
// Archive: Product.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class Product */

class Product {
    constructor(id, title, description, price, code, status, stock, category, thumbnails) {
        this.id = id; // unique id
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code; // unique code 
        this.status = new Boolean(status);
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails; // array of paths to tumbnail images
    }
    
    /**
     * Returns a new `Product` object with the data from a valid JSON object.
     * @param {Object} json Object with the `Product` class format.
     * @returns {Product} A new `Product` object.
     */
    static fromJSON(json) {
        return new Product(json.id, json.title, json.description, json.price, json.code,
            json.status, json.stock, json.category, json.thumbnails);
    }

    /**
     * Formats the `Product` object data into a string.
     * @returns {String} A string with the `Product` object data.
     */
    toString() {
        return `ID: ${this.id} =>
        Title: ${this.title}
        Description: ${this.description}
        Code: ${this.code}
        Price: \$${this.price}
        Status: ${this.status}
        Stock: ${this.stock}
        Category: ${this.category}
        thumbnails: ${this.thumbnails}`;
    }
}

/* Exports */

export default Product;