/* Ecommerce Server - Final Project */
// Archive: user.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import UserModel from "../models/user.model.js";
import UserDTO from "../../../dtos/user.dto.js";
import Logger from "../../../config/logger.config.js";

/* Main DAO Logic */

const log = new Logger();

class MongoDBUserDAO {
    /**
     * Add a new user to the database.
     * @param {User} user - User object.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async create(user) {
        try {
            const newUser = await UserModel.create(user);
            const userDTO = new UserDTO(newUser);
            return userDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error creating user: ${error}`);
        }
    };

    /**
     * Get a user from the database using its ID.
     * @param {String} id - User ID.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getById(id) {
        try {
            const user = await UserModel.findById(id).lean()
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error getting user by id: ${error}`);
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getByEmail(email) {
        try {
            const user = await UserModel.findOne({ email }).lean();
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error getting user by email: ${error}`);
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
            const updatedUser = await UserModel.updateOne({ _id: id }, user);
            const userDTO = new UserDTO(updatedUser);
            return userDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error updating user: ${error}`);
        }
    };
};

/* Exports */

export default MongoDBUserDAO;