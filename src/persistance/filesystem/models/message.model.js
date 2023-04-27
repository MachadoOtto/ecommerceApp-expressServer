/* Ecommerce Server - Final Project */
// Archive: message.model.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class MessageModel */

class MessageModel {
    constructor( {id, user, message, date} ) {
        this.id = id; // unique id
        this.user = user;
        this.message = message;
        this.date = date;
    }
};

/* Exports */

export default MessageModel;