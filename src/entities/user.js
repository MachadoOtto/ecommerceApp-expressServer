/* Ecommerce Server - Final Project */
// Archive: user.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Entity Class */

class User {
    constructor( {_id, email, first_name, last_name, age, cart, role, documents, last_connection} ) {
        this._id = _id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.cart = cart;
        this.role = role;
        this.documents = documents;
        this.last_connection = last_connection;
    };
};

/* Exports */

export default User;