/* Ecommerce Server - Final Project */
// Archive: user.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import UserModel from "../models/user.model.js";
import UserDTO from "../../../dtos/user.dto.js";

/* Main DAO Logic */

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
            console.log(`[DEBUG][MongoDBUserDAO] Error creating user: ${error}`);
        }
    };

    /**
     * Get a user from the database using its ID.
     * @param {String} id - User ID.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getById(id) {
        try {
            const user = await UserModel.findById(id)
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBUserDAO] Error getting user by id: ${error}`);
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<UserDTO>} - User DTO.
     */
    async getByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            const userDTO = new UserDTO(user);
            return userDTO;
        } catch (error) {
            console.log(`[DEBUG][MongoDBUserDAO] Error getting user by email: ${error}`);
        }
    };
};

/* Exports */

export default MongoDBUserDAO;