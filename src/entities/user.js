/* Ecommerce Server - Final Project */
// Archive: user.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Entity Class */

class User {
    constructor( {_id, email, first_name, last_name, age, cart, role} ) {
        this._id = _id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.cart = cart;
        this.role = role;
    };
};

/* Exports */

export default User;