/* Ecommerce Server - Final Project */
// Archive: UserManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import User from '../models/user.model.js';
import UserDTO from "../../../dtos/user.dto.js";
import Logger from '../../../config/logger.config.js';

/* Main Logic */

const log = new Logger();

/* Class UserManager */

class UserManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of users.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, JSON.stringify({ lastId: this.#lastId, users: [] }, null, '\t'));
        } else {
            // If the file exists, the lastId is read from it.
            let userMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = userMngrObj.lastId;
        }
    };

    /**
     * Add a new user to the database.
     * @param {User} user - User object.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async create(user) {
        try {
            user.id = ++this.#lastId;
            const users = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).users;
            if (users.find(u => u.email === user.email)) {
                throw new Error(`User with email ${user.email} already exists`);
            }
            const newUser = new User(user);
            users.push(newUser);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, users: users }, null, '\t'));
            const userDTO = new UserDTO(newUser);
            return userDTO;
        } catch (error) {
            --this.#lastId;
            log.logger.debug(`[UserManager] Error creating user: ${error}`);
            throw new Error(`Error creating user: ${error}`);
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
            log.logger.debug(`[UserManager] Error getting user by id: ${error}`);
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
            log.logger.debug(`[UserManager] Error getting user by email: ${error}`);
            throw new Error(`Error getting user by email: ${error}`);
        }
    };

    /**
     * Update a user in the database.
     * @param {String} id - User ID.
     * @param {User} user - User object.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async update(id, user) {
        try {
            const updatedUser = new User(user);
            const users = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).users;
            if (users.find(u => u.id === id)) {
                u = updatedUser
            } else {
                throw new Error(`Not found: User with ID ${id} does not exist`);
            }
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, users: users }, null, '\t'));
            const userDTO = new UserDTO(updatedUser);
            return userDTO;
        } catch (error) {
            --this.#lastId;
            log.logger.debug(`[UserManager] Error updating user: ${error}`);
            throw new Error(`Error updating user: ${error}`);
        }
    };
};

/* Exports */

export default UserManager;