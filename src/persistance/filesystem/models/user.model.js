/* Ecommerce Server - Final Project */
// Archive: user.model.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class UserModel */

class UserModel {
    constructor( {id, email, password, first_name, last_name, age, cart, role} ) {
        this.id = id; // unique id
        this.email = email; // unique email
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.cart = cart;
        this.role = role;
    }
};

/* Exports */

export default UserModel;