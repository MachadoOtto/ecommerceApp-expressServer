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

    /**
     * Get all users from the database.
     * @returns {Promise<UserDTO[]>} - Array of User DTOs.
     */
    async getAll() {
        try {
            const users = await UserModel.find().lean();
            const usersDTO = users.map(user => new UserDTO(user));
            return usersDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error getting all users: ${error}`);
        }
    };

    /**
     * Delete a user from the database that haven't logged in in the last X days.
     * @param {Number} days - Days.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async deleteInactiveUsers(days) {
        try {
            // First find the users that haven't logged in in the last X days.
            const inactiveUsers = await UserModel.find({ last_connection: { $lt: new Date(Date.now() - (days * 24 * 60 * 60 * 1000)) } }).lean();
            // Delete the users that haven't logged in in the last X days.
            await UserModel.deleteMany({ last_connection: { $lt: new Date(Date.now() - (days * 24 * 60 * 60 * 1000)) } });
            const inactiveUsersDTO = new UserDTO(inactiveUsers);
            return inactiveUsersDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error deleting inactive users: ${error}`);
        }
    };

    /**
     * Delete a user from the database.
     * @param {String} id - User ID.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async delete(id) {
        try {
            // First find the user.
            const user = await UserModel.findById(id).lean();
            await UserModel.deleteOne({ _id: id });
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            log.logger.debug(`[MongoDBUserDAO] Error deleting user: ${error}`);
        }
    };
};

/* Exports */

export default MongoDBUserDAO;