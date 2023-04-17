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

/* Services */

class SessionService {
    constructor() {
        this.userRepository = new UserRepository();
        this.cartService = new CartService();
    };

    /**
     * Register a new user.
     * @param {Object} user - User object.
     * @param {String} role - User role.
     * @returns {Promise<User>} - User object added to the database.
     */
    async registerUser(user, role) {
        if (!user.email || !user.password || !user.first_name || !user.last_name || !user.age || (user.email.trim().toLowerCase() === Config.getAdminEmail())) {
            throw new Error("Invalid user data");
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
            console.log(`[DEBUG][SessionsService] Error registering user: ${error.message}`)
            throw new Error("Error registering user");
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
            console.log(`[DEBUG][SessionsService] Error logging in user: ${error.message}`)
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
            console.log(`[DEBUG][SessionsService] Error with GitHub SSO: ${error.message}`);
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
        } else {
            try {
                const user = await this.userRepository.getById(id);
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            } catch (error) {
                console.log(`[DEBUG][SessionsService] Error getting user: ${error.message}`);
                throw new Error("Error getting user");
            }
        }
    };

    /**
     * Get a user from the database using its email.
     * @param {String} email - User email.
     * @returns {Promise<User>} - User object from the database.
     */
    async getUserByEmail(email) {
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
            console.log(`[DEBUG][SessionsService] Error getting user: ${error.message}`);
            throw new Error("Error getting user");
        }
    };
};

/* Exports */

export default SessionService;