/* Ecommerce Server - Final Project */
// Archive: message.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MessageModel from "../models/message.model.js";
import MessageDTO from "../../../dtos/message.dto.js";

/* Main DAO Logic */

class MongoDBMessageDAO {
    /**
     * Creates a new message in the database.
     * @param {String} user - User name.
     * @param {String} message - Message text.
     * @returns {Promise<MessageDTO>} - Message DTO.
     */
    async create( {user, message} ) {
        try {
            const new_message = await MessageModel.create({ user, message });
            const messageDTO = new MessageDTO(new_message);
            return messageDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBMessageDAO] Error creating message: ${error}`);
            throw new Error("Error creating message");
        }
    };

    /**
     * Returns all messages from database, limited by the limit parameter.
     * @param {Number} limit - Maximum number of messages to return.
     * @returns {Promise<MessageDTO[]>} - Object with all messages.
     */
    async getMessages(limit) {
        try {
            const messages = await MessageModel.find().limit(limit).lean();
            const messagesDTO = messages.map( message => new MessageDTO(message) );
            return messagesDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBMessageDAO] Error getting messages: ${error}`);
            throw new Error("Error getting messages");
        }
    };
};

/* Exports */

export default MongoDBMessageDAO;