/* Ecommerce Server - Final Project */
// Archive: user.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import User from "../entities/user.js";
import { comparePassword } from "../utils/bcrypt.utils.js";
import Logger from "../config/logger.config.js";

/* Main Repository Logic */

const log = new Logger();

class UserRepository {
    constructor() {
        this.dao = FactoryDAO.getUserDAO(Config.getDao());
    };

    /**
     * Creates a new user.
     * @param {*} data 
     * @returns {User} The new user.
     */
    async create(data) {
        try {
            const userDTO = await this.dao.create(data);
            return new User(userDTO);
        } catch (error) {
            log.logger.debug(`[UserRepository] Error creating user: ${error}`);
            throw new Error("Error creating user");
        }
    };

    /**
     * Returns a user by id.
     * @param {String} id 
     * @returns {User} The user with the given id.
     */
    async getById(id) {
        try {
            const userDTO = await this.dao.getById(id);
            return new User(userDTO);
        } catch (error) {
            log.logger.debug(`[UserRepository] Error getting user by id: ${error}`);
            throw new Error("Error getting user by id");
        }
    };

    /**
     * Returns a user by email.
     * @param {String} email
     * @returns {User} The user with the given email.
     */
    async getByEmail(email) {
        try {
            const userDTO = await this.dao.getByEmail(email);
            return new User(userDTO);
        } catch (error) {
            log.logger.debug(`[UserRepository] Error getting user by email: ${error}`);
            throw new Error("Error getting user by email");
        }
    };

    /**
     * Returns a user by email and password (for login).
     * @param {String} email 
     * @param {String} password
     * @returns {User} The user with the given email and password.
     */
    async getByEmailAndPassword(email, password) {
        try {
            const userDTO = await this.dao.getByEmail(email);
            if (userDTO) {
                if (await comparePassword(password, userDTO.password)) {
                    return new User(userDTO);
                }
            }
            throw new Error("Invalid credentials");
        } catch (error) {
            log.logger.debug(`[UserRepository] Error comparing password: ${error}`);
            throw new Error("Error comparing password");
        }
    };
};

/* Exports */

export default UserRepository;