/* Ecommerce Server - Final Project */
// Archive: message.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import Message from "../entities/message.js";

/* Main Repository Logic */

class MessageRepository {
    constructor() {
        this.dao = FactoryDAO.getMessageDAO(Config.getDao());
    };

    /**
     * Creates a new message
     * @param {*} data 
     * @returns {Message} The new message
     */
    async create(data) {
        try {
            const messageDTO = await this.dao.create(data);
            return new Message(messageDTO);
        } catch (error) {
            console.log(`[DEBUG][MessageRepository] Error creating message: ${error}`);
            throw new Error("Error creating message");
        }
    };

    /**
     * Returns all messages limited by the given limit
     * @param {Number} limit 
     * @returns {Message[]} 
     */
    async getMessages(limit) {
        try {
            const messagesDTOs = await this.dao.getMessages(limit);
            return messagesDTOs.map( messageDTO => new Message(messageDTO) );
        } catch (error) {
            console.log(`[DEBUG][MessageRepository] Error getting messages: ${error}`);
            throw new Error("Error getting messages");
        }
    };
};

/* Exports */

export default MessageRepository;