/* Ecommerce Server - Final Project */
// Archive: sessions.services.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import UserModel from "../dao/database/models/user.models.js";

/* Services */

class SessionService {
    /**
     * Add a new user to the database.
     * @param {Object} user - User object.
     * @returns {Promise<UserModel>} - User object added to the database.
     */
    static async addUser(user) {
        try {
            return await UserModel.create(user);
        } catch (error) {
            throw error;
        }
    };

    /**
     * Get a user from the database using its ID.
     * @param {String} id - User ID.
     * @returns {Promise<UserModel>} - User object from the database.
     */
    static async getUserById(id) {
        try {
            return await UserModel.findById(id).lean();
        } catch (error) {
            throw error;
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<UserModel>} - User object from the database.
     */
    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email }).lean();
        } catch (error) {
            throw error;
        }
    };
};

/* Exports */

export default SessionService;