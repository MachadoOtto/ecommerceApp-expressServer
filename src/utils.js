/* Ecommerce Server - Final Project */
// Archive: utils.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

/* Main Logic */

/**
 * Encrypt a password using bcrypt.
 * @param {String} password - Password to encrypt.
 * @returns {Promise<String>} - Encrypted password.
 */
export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * Compare a password with a received password.
 * @param {String} password - Password to compare. 
 * @param {String} receivedPassword - Received password to compare.
 * @returns {Promise<Boolean>} - True if the passwords match, false otherwise.
 */
export const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;