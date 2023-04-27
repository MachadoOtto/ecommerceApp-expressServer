/* Ecommerce Server - Final Project */
// Archive: uuid.utils.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { v4 } from 'uuid';

/* Main Logic */

/**
 * Generate a UUID.
 * @returns {String} - UUID.
 */
export const generateUUID = () => {
    return v4();
};