/* Ecommerce Server - Final Project */
// Archive: messages.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MessageRepository from "../repositories/message.repository.js";
import Message from "../entities/message.js";
import ErrorUtils from "./errors/utils.error.js";
import Logger from "../config/logger.config.js";

/* Main Service Logic */

const log = new Logger();

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
            log.logger.debug(`[MessageService] Error getting messages: ${error}`);
            ErrorUtils.messageNotFoundError(error);
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
            log.logger.debug(`[MessageService] Error adding message: ${error}`);
            let cause = `User received: ${user}, Message received: ${message}`
            ErrorUtils.messageCreateError(cause);
        }
    };
};

/* Exports */

export default MessageService;