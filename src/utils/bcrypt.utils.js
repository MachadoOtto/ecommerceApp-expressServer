/* Ecommerce Server - Final Project */
// Archive: bcrypt.utils.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

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