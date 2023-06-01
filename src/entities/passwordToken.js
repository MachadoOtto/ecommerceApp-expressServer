/* Ecommerce Server - Final Project */
// Archive: passwordToken.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Entity Class */

class PasswordToken {
    constructor( {_id, userId, token, createdAt} ) {
        this._id = _id;
        this.userId = userId;
        this.token = token;
        this.createdAt = createdAt;
    };
};

/* Exports */

export default PasswordToken;