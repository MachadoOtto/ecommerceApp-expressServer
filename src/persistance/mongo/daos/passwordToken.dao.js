/* Ecommerce Server - Final Project */
// Archive: passwordToken.dao.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import PasswordTokenModel from "../models/passwordToken.model.js";
import PasswordTokenDTO from "../../../dtos/passwordToken.dto.js";
import Logger from "../../../config/logger.config.js";
import passwordTokenModel from "../models/passwordToken.model.js";

/* Main DAO Logic */

const log = new Logger();

class MongoDBPasswordTokenDAO {
    /**
     * Creates a new password token in the database.
     * @param {String} userId - User ID.
     * @param {String} token - Token.
     * @returns {Promise<PasswordTokenDTO>} - PasswordToken DTO.
     */
    async create( {userId, token} ) {
        try {
            const passwordToken = await PasswordTokenModel.create( {userId, token} );
            return new PasswordTokenDTO(passwordToken);
        } catch (error) {
            log.logger.debug(`[MongoDBPasswordTokenDAO] Error creating password token: ${error}`);
            throw new Error("Error creating password token");
        }
    };

    /**
     * Returns a password token by its token value.
     * @param {String} token - Password token.
     * @returns {Promise<PasswordTokenDTO>} - PasswordToken DTO.
     */
    async getPasswordToken(token) {
        try {
            const passwordToken = await passwordTokenModel.findOne({ token }).lean();
            return new PasswordTokenDTO(passwordToken);
        } catch (error) {
            log.logger.debug(`[MongoDBPasswordTokenDAO] Error getting password token: ${error}`);
            throw new Error("Error getting password token");
        }
    };

    /**
     * Deletes a password token from database by its token value.
     * @param {String} token - Password token.
     * @returns {Promise<PasswordTokenDTO>} - PasswordToken DTO.
     */
    async delete(token) {
        try {
            const passwordToken = await passwordTokenModel.deleteOne({ token }).lean();
            return new PasswordTokenDTO(passwordToken);
        } catch (error) {
            log.logger.debug(`[MongoDBPasswordTokenDAO] Error deleting password token: ${error}`);
            throw new Error("Error deleting password token");
        }
    };
};

/* Exports */

export default MongoDBPasswordTokenDAO;