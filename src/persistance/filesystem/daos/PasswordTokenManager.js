/* Ecommerce Server - Final Project */
// Archive: PasswordTokenManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import PasswordToken from '../models/passwordToken.model.js';
import PasswordTokenDTO from '../../../dtos/passwordToken.dto.js';
import Logger from '../../../config/logger.config.js';

/* Main Logic */

const log = new Logger();

/* Class PasswordTokenManager */

class PasswordTokenManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of tokens.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, JSON.stringify({ lastId: this.#lastId, passwordTokens: [] }, null, '\t'));
        } else {
            // If the file exists, the lastId is read from it.
            let passTokMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = passTokMngrObj.lastId;
        }
    };

    /**
     * Creates a new password token in the database.
     * @param {String} userId - User ID.
     * @param {String} token - Token.
     * @returns {Promise<PasswordTokenDTO>} - PasswordToken DTO.
     */
    async create( {userId, token} ) {
        try {
            const new_passwordToken = new PasswordToken(++this.#lastId, userId, token, new Date());
            const passwordTokens = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).passwordTokens;
            passwordTokens.push(new_passwordToken);
            await fs.promises.writeFile(this.#path, JSON.stringify({ lastId: this.#lastId, passwordTokens: passwordTokens }, null, '\t'));
            const passwordTokenDTO = new PasswordTokenDTO(new_passwordToken);
            return passwordTokenDTO;
        } catch (error) {
            --this.#lastId;
            log.logger.debug(`[PasswordTokenManager] Error creating password token: ${error}`);
            throw new Error("Error creating password token");
        }
    };

    /**
     * Returns a password token from database by its token.
     * @param {String} token - Password token.
     * @returns {Promise<PasswordTokenDTO>} - PasswordToken DTO.
     */
    async getPasswordToken(token) {
        try {
            const passwordTokens = await JSON.parse(fs.readFileSync(this.#path, 'utf-8')).passwordTokens;
            const passwordToken = passwordTokens.find(passwordToken => passwordToken.token == token);
            const passwordTokenDTO = new PasswordTokenDTO(passwordToken);
            return passwordTokenDTO;
        } catch (error) {
            log.logger.debug(`[PasswordTokenManager] Error getting password token: ${error}`);
            throw new Error("Error getting password token");
        }
    };
};

/* Exports */

export default PasswordTokenManager;