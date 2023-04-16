/* Ecommerce Server - Final Project */
// Archive: config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import dotenv from 'dotenv';

/* Main Logic */

dotenv.config();

class Config {
    static getPort() {
        return process.env.PORT || 8080;
    };

    static getDao() {
        return process.env.DAO;
    };

    static getMongoDBUrl() {
        return process.env.MONGODB_URL;
    };

    static getMongoDBSessionsUrl() {
        return process.env.MONGODB_SESSIONS_URL;
    };

    static getSessionSecret() {
        return process.env.SESSION_SECRET;
    };

    static getSessionTTL() {
        return process.env.SESSION_TTL || 150;
    };

    static getAdminEmail() {
        return process.env.ADMIN_EMAIL;
    };

    static getAdminPassword() {
        return process.env.ADMIN_PASSWORD;
    };

    static getAdminCartId() {
        return process.env.ADMIN_CART_ID;
    };

    static getGithubClientId() {
        return process.env.GITHUB_CLIENT_ID;
    };

    static getGithubClientSecret() {
        return process.env.GITHUB_CLIENT_SECRET;
    };

    static getGithubCallbackUrl() {
        return process.env.GITHUB_CALLBACK_URL;
    };
};

/* Exports */

export default Config;