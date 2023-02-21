/* Ecommerce Server - Final Project */
// Archive: messages.models.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import messageModel from "../dao/database/models/message.models.js";

/* Services */

class MessageService {
    /**
     * Returns all messages from database, limited by the limit parameter.
     * @param {Number} limit - Maximum number of messages to return.
     * @returns {Promise<MessageModel[]>} - Object with all messages.
     * @throws {Error} - Database error.
     */
    static async getMessages(limit) {
        try {
            return await messageModel.find().limit(limit).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds a new message to the database.
     * @param {String} user - User name.
     * @param {String} message - Message text.
     * @returns {Promise<MessageModel>} - Message object added to the database.
     * @throws {Error} - Database error.
     */
    static async addMessage(user, message) {
        try {
            return await messageModel.create({ user, message });
        } catch (error) {
            throw error;
        }
    }
};

/* Exports */

export default MessageService;