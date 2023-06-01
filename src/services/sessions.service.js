/* Ecommerce Server - Final Project */
// Archive: sessions.service.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import CartService from './carts.service.js';
import UserRepository from "../repositories/user.repository.js";
import User from "../entities/user.js";
import { encryptPassword } from '../utils/bcrypt.utils.js';
import ErrorUtils from "./errors/utils.error.js";
import Logger from "../config/logger.config.js";
import PasswordToken from "../entities/passwordToken.js";
import PasswordTokenRepository from "../repositories/passwordToken.repository.js";
import { generateUUID } from "../utils/uuid.utils.js";

/* Main Service Logic */
const admin = new User({
    _id: 0,
    email: Config.getAdminEmail(),
    first_name: 'Admin',
    last_name: 'Coder',
    age: 99,
    cart: Config.getAdminCartId(),
    role: 'Admin'
});

const log = new Logger();

/* Services */

class SessionService {
    constructor() {
        this.userRepository = new UserRepository();
        this.cartService = new CartService();
        this.passwordTokenRepository = new PasswordTokenRepository();
    };

    /**
     * Register a new user.
     * @param {Object} user - User object.
     * @param {String} role - User role.
     * @returns {Promise<User>} - User object added to the database.
     */
    async registerUser(user, role) {
        if (!user.email || !user.password || !user.first_name || !user.last_name || !user.age || (user.email.trim().toLowerCase() === Config.getAdminEmail())) {
            let cause = `User Data received: ${user}, Role received: ${role}`;
            ErrorUtils.userDataError(cause);
        }
        try {
            const newCart = await this.cartService.createCart();
            const newUser = {
                email: user.email.trim().toLowerCase(),
                password: await encryptPassword(user.password),
                first_name: user.first_name.trim(),
                last_name: user.last_name.trim(),
                age: user.age,
                cart: newCart,
                role: role
            };
            const userEntity = await this.userRepository.create(newUser);
            if (!userEntity) {
                throw new Error("Error registering user");
            }
            return userEntity;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error registering user: ${error.message}`)
            let cause = `User Data received: ${user}, Role received: ${role}`;
            ErrorUtils.userCreateError(cause);
        }    
    };

    /**
     * Login a user using its email and password.
     * @param {String} email - User email.
     * @param {String} password - User password.
     * @returns {Promise<User>} - User object from the database.
     */
    async loginUser(email, password) {
        try {
            // Check for hardcoded admin user
            if ((email.trim().toLowerCase() === Config.getAdminEmail().trim().toLowerCase()) && password === Config.getAdminPassword()) {
                return admin;
            } else {
                const user = await this.userRepository.getByEmailAndPassword(email, password);
                if (user) {
                    return user;
                }
                throw new Error("Invalid email or password");
            }
        } catch (error) {
            log.logger.debug(`[SessionsService] Error logging in user: ${error.message}`)
            throw new Error("Error logging in user");
        }
    };

    /**
     * Github Single Sign On.
     * @param {Object} gitUser - Github user object.
     * @returns {Promise<User>} - User object from the database.
     */
    async githubSSO(gitUser) {
        try {
            const user = await this.userRepository.getByEmail(gitUser.email);
            if (user) {
                return user;
            } else {
                const newCart = await this.cartService.createCart();
                const newUser = {
                    email: gitUser.email,
                    password: gitUser.password,
                    first_name: gitUser.first_name,
                    last_name: gitUser.last_name,
                    age: gitUser.age,
                    cart: newCart,
                    role: gitUser.role
                };
                const user = await this.userRepository.create(newUser);
                if (!user) {
                    throw new Error("Error registering user");
                }
                return user;
            }
        } catch (error) {
            log.logger.debug(`[SessionsService] Error with GitHub SSO: ${error.message}`);
            throw new Error("Error registering user");
        }
    };

    /**
     * Get a user from the database using its ID.
     * @param {String} id - User ID.
     * @returns {Promise<User>} - User object from the database.
     */
    async getUserById(id) {
        if (id === 0) {
            return admin;
        }
        if (!id) {
            let cause = `User ID received: ${id}`;
            ErrorUtils.userIdRequiredError(cause);
        }
        try {
            const user = await this.userRepository.getById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error getting user: ${error.message}`);
            let cause = `User ID received: ${id}`;
            ErrorUtils.userNotFound(cause);
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<User>} - User object from the database.
     */
    async getUserByEmail(email) {
        if (!email) {
            let cause = `User Email received: ${email}`;
            ErrorUtils.userEmailRequiredError(cause);
        }
        if (email === Config.getAdminEmail()) {
            return admin;
        }
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error getting user: ${error.message}`);
            let cause = `User Email received: ${email}`;
            ErrorUtils.userNotFound(cause);
        }
    };

    /**
     * Generates a password reset token to the user.
     * @param {String} email - User email.
     * @returns {Promise<PasswordToken>} - .
     */
    async generatePasswordToken(email) {
        if (!email) {
            let cause = `User Email received: ${email}`;
            ErrorUtils.userEmailRequiredError(cause);
        }
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                let cause = `User Email received: ${email}`;
                ErrorUtils.userNotFound(cause);
            }
            // generate a random unique token
            const token = generateUUID();
            const passwordToken = await this.passwordTokenRepository.create({userId: user._id, token: token});
            return passwordToken;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error generating password reset token: ${error.message}`);
            let cause = `User Email received: ${email}`;
            ErrorUtils.tokenCreateError(cause);
        }
    };

    /**
     * Returns a password reset token from the database using its token. It also checks if the token is not expired.
     * @param {String} token - Password reset token.
     * @returns {Promise<PasswordToken>} - PasswordToken object from the database.
     */
    async getPasswordToken(token) {
        if (!token) {
            let cause = `Password Token received: ${token}`;
            ErrorUtils.tokenRequiredError(cause);
        }
        try {
            const passwordToken = await this.passwordTokenRepository.getPasswordToken(token);
            if (!passwordToken) {
                let cause = `Password Token received: ${token}`;
                ErrorUtils.tokenNotFoundError(cause);
            }
            const tokenDate = new Date(passwordToken.createdAt);
            const now = new Date();
            const diff = now.getTime() - tokenDate.getTime();
            const diffHours = Math.floor(diff / (1000 * 60 * 60));
            if (diffHours > 1) {
                let cause = `Password Token (expired) received: ${token}`;
                ErrorUtils.tokenNotFoundError(cause);
            }
            return passwordToken;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error getting password reset token: ${error.message}`);
            let cause = `Password Token received: ${token}`;
            ErrorUtils.tokenNotFoundError(cause);
        }
    };

    /**
     * Deletes a password reset token from the database.
     * @param {String} token - Password reset token.
     * @returns {Promise<PasswordToken>} - PasswordToken object from the database.
     */
    async deletePasswordToken(token) {
        if (!token) {
            let cause = `Password Token received: ${token}`;
            ErrorUtils.tokenRequiredError(cause);
        }
        try {
            const passwordToken = await this.passwordTokenRepository.delete(token);
            if (!passwordToken) {
                let cause = `Password Token received: ${token}`;
                ErrorUtils.tokenNotFoundError(cause);
            }
            return passwordToken;
        } catch (error) {
            log.logger.debug(`[SessionsService] Error deleting password reset token: ${error.message}`);
            let cause = `Password Token received: ${token}`;
            ErrorUtils.tokenNotFoundError(cause);
        }
    };

    /**
     * Updates the user password.
     * @param {String} userId - User ID.
     * @param {String} password - User password.
     * @returns {Promise<User>} - User object from the database.
     */
    async changePassword(userId, password) {
        if (!userId) {
            let cause = `User ID received: ${userId}, Password received: ${password}`;
            ErrorUtils.userIdRequiredError(cause);
        }
        if (!password) {
            let cause = `User ID received: ${userId}, Password received: ${password}`;
            ErrorUtils.userDataRequiredError(cause);
        }
        try {
            const user = await this.userRepository.getById(userId);
            if (!user) {
                let cause = `User ID received: ${userId}, Password received: ${password}`;
                ErrorUtils.userNotFound(cause);
            } else if (user.password === password) {
                let cause = `User ID received: ${userId}, Password received: ${password}`;
                ErrorUtils.userDataError(cause);
            } else {
                user.password = await encryptPassword(password);
                const updatedUser = await this.userRepository.update(userId, user);
                if (!updatedUser) {
                    let cause = `User ID received: ${userId}, Password received: ${password}`;
                    ErrorUtils.userUpdateError(cause);
                }
                return updatedUser;
            }
        } catch (error) {
            log.logger.debug(`[SessionsService] Error updating user password: ${error.message}`);
            let cause = `User ID received: ${userId}, Password received: ${password}`;
            ErrorUtils.userUpdateError(cause);
        }
    };

    /**
     * Changes the user role.
     * @param {String} userId - User ID.
     * @returns {Promise<User>} - User object from the database.
     */
    async changeRole(userId) {
        if (!userId) {
            let cause = `User ID received: ${userId}`;
            ErrorUtils.userIdRequiredError(cause);
        }
        try {
            const user = await this.userRepository.getById(userId);
            if (!user) {
                let cause = `User ID received: ${userId}`;
                ErrorUtils.userNotFound(cause);
            } else {
                user.role = user.role === "Premium" ? "User" : "Premium";
                const updatedUser = await this.userRepository.update(userId, user);
                if (!updatedUser) {
                    let cause = `User ID received: ${userId}`;
                    ErrorUtils.userUpdateError(cause);
                }
                return updatedUser;
            }
        } catch (error) {
            log.logger.debug(`[SessionsService] Error updating user role: ${error.message}`);
            let cause = `User ID received: ${userId}`;
            ErrorUtils.userUpdateError(cause);
        }
    };
};

/* Exports */

export default SessionService;