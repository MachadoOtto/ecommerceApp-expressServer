/* Ecommerce Server - Final Project */
// Archive: messages.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MessageRepository from "../repositories/message.repository.js";
import Message from "../entities/message.js";

/* Services */

class MessageService {
    constructor() {
        this.messageRepository = new MessageRepository();
    };

    /**
     * Returns all messages from database, limited by the limit parameter.
     * @param {Number} limit - Maximum number of messages to return.
     * @returns {Promise<Message[]>} - Object with all messages.
     */
    async getMessages(limit) {
        try {
            const messages = await this.messageRepository.getMessages(limit);
            return messages;
        } catch (error) {
            console.log(`[DEBUG][MessageService] Error getting messages: ${error}`);
            throw new Error("Error getting messages");
        }
    };

    /**
     * Adds a new message to the database.
     * @param {String} user - User name.
     * @param {String} message - Message text.
     * @returns {Promise<Message>} - Message.
     */
    async addMessage(user, message) {
        try {
            const newMessage = await this.messageRepository.create({ user, message });
            return newMessage;
        } catch (error) {
            console.log(`[DEBUG][MessageService] Error adding message: ${error}`);
            throw new Error("Error adding message");
        }
    };
};

/* Exports */

export default MessageService;