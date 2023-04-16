/* Ecommerce Server - Final Project */
// Archive: user.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class UserDTO {
    constructor( {_id, email, password, first_name, last_name, age, cart, role} ) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.cart = cart;
        this.role = role;
    };
};

/* Exports */

export default UserDTO;