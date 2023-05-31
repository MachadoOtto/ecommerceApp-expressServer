/* Ecommerce Server - Final Project */
// Archive: passwordToken.model.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Class PasswordTokenModel */

class PasswordToken {
    constructor(id, userId, token, createdAt) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.createdAt = createdAt;
    }

    /**
     * Returns a new `PasswordToken` object with the data from a valid JSON object.
     * @param {Object} json Object with the `PasswordToken` class format.
     * @returns {PasswordToken} A new `PasswordToken` object.
     */
    static fromJSON(json) {
        return new PasswordToken(json.id, json.userId, json.token, json.createdAt);
    }

    /**
     * Formats the `PasswordToken` object data into a string.
     * @returns {String} A string with the `PasswordToken` object data.
     */
    toString() {
        return `ID: ${this.id} =>
        User ID: ${this.userId}
        Token: ${this.token}
        Created At: ${this.createdAt}`;
    }
};

/* Exports */

export default PasswordToken;