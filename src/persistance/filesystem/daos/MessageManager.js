/* Ecommerce Server - Final Project */
// Archive: MessageManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import Message from '../models/message.model.js';
import MessageDTO from '../../../dtos/message.dto.js';

/* Class MessageManager */

class MessageManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of messages.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, JSON.stringify({ lastId: this.#lastId, messages: [] }, null, '\t'));
        } else {
            // If the file exists, the lastId is read from it.
            let cartMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = cartMngrObj.lastId;
        }
    };

    /**
     * Creates a new message in the database.
     * @param {String} user - User name.
     * @param {String} message - Message text.
     * @returns {Promise<MessageDTO>} - Message DTO.
     */
    async create( {user, message} ) {
        try {
            const new_message = new Message(++this.#lastId, user, message, new Date());
            const messages = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).messages;
            messages.push(new_message);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, messages: messages }, null, '\t'));
            const messageDTO = new MessageDTO(new_message);
            return messageDTO;
        } catch (error) {
            --this.#lastId;
            console.log(`[DEBUG][MessageManager] Error creating message: ${error}`);
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
            const messages = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).messages;
            
            // const messages = await MessageModel.find().limit(limit).lean();
            // const messagesDTO = messages.map( message => new MessageDTO(message) );
            return messagesDTO;
        } catch (error) {
            console.log(`[DEBUG][MessageDTO] Error getting messages: ${error}`);
            throw new Error("Error getting messages");
        }
    };

    /**
     * Get a user from the database using its ID.
     * @param {String} id - User ID.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getById(id) {
        try {
            const users = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).users;
            const user = users.find(user => user.id === id);
            if (user === undefined) {
                throw new Error(`Not found: User with ID ${id} does not exist`);
            }
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            console.log(`[DEBUG][UserManager] Error getting user by id: ${error}`);
            throw new Error(`Error getting user by id: ${error}`);
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getByEmail(email) {
        try {
            const users = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).users;
            const user = users.find(user => user.email === email);
            if (user === undefined) {
                throw new Error(`Not found: User with email ${email} does not exist`);
            }
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            console.log(`[DEBUG][UserManager] Error getting user by email: ${error}`);
            throw new Error(`Error getting user by email: ${error}`);
        }
    };
};

/* Exports */

export default MessageManager;