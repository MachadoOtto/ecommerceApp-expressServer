/* Ecommerce Server - Final Project */
// Archive: passwordToken.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class PasswordTokenDTO {
    constructor( {_id, userId, token, createdAt} ) {
        this._id = _id;
        this.userId = userId;
        this.token = token;
        this.createdAt = createdAt;    
    };
};

/* Exports */

export default PasswordTokenDTO;