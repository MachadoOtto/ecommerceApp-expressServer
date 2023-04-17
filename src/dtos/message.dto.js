/* Ecommerce Server - Final Project */
// Archive: message.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* DTO Class */

class MessageDTO {
    constructor( {_id, user, message, date} ) {
        this._id = _id;
        this.user = user;
        this.message = message;
        this.date = date;
    };
};

/* Exports */

export default MessageDTO;