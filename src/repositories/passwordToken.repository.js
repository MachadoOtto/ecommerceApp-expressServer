/* Ecommerce Server - Final Project */
// Archive: message.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import PasswordToken from "../entities/passwordToken.js";
import Logger from "../config/logger.config.js";

/* Main Repository Logic */

const log = new Logger();

class PasswordTokenRepository {
    constructor() {
        this.dao = FactoryDAO.getPasswordTokenDAO(Config.getDao());
    };

    /**
     * Creates a new password token.
     * @param {*} data 
     * @returns {PasswordToken} The new password token.
     */
    async create(data) {
        try {
            const passwordTokenDTO = await this.dao.create(data);
            return new PasswordToken(passwordTokenDTO);
        } catch (error) {
            log.logger.debug(`[PasswordTokenRepository] Error creating password token: ${error}`);
            throw new Error("Error creating password token");
        }
    };

    /**
     * Returns a password token by its token.
     * @param {String} token - Password token. 
     * @returns {PasswordToken} 
     */
    async getPasswordToken(token) {
        try {
            const passwordTokenDTO = await this.dao.getPasswordToken(token);
            return new PasswordToken(passwordTokenDTO);
        } catch (error) {
            log.logger.debug(`[PasswordTokenRepository] Error getting password token: ${error}`);
            throw new Error("Error getting password token");
        }
    };

    /**
     * Deletes a password token by its token.
     * @param {String} token - Password token.
     * @returns {PasswordToken} - The deleted password token.
     */
    async delete(token) {
        try {
            const passwordTokenDTO = await this.dao.delete(token);
            return new PasswordToken(passwordTokenDTO);
        } catch (error) {
            log.logger.debug(`[PasswordTokenRepository] Error deleting password token: ${error}`);
            throw new Error("Error deleting password token");
        }
    };
};

/* Exports */

export default PasswordTokenRepository;