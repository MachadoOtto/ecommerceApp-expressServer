/* Ecommerce Server - Final Project */
// Archive: user.repository.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";
import FactoryDAO from "../persistance/factory.js";
import User from "../entities/user.js";
import { comparePassword } from "../utils.js";

/* Main Repository Logic */

class UserRepository {
    constructor() {
        this.dao = FactoryDAO.getUserDAO(Config.getDao());
    };

    async create(data) {
        try {
            const userDTO = await this.dao.create(data);
            return new User(userDTO);
        } catch (error) {
            console.log(`[DEBUG][UserRepository] Error creating user: ${error}`);
        }
    };

    async getById(id) {
        try {
            const userDTO = await this.dao.getById(id);
            return new User(userDTO);
        } catch (error) {
            console.log(`[DEBUG][UserRepository] Error getting user by id: ${error}`);
        }
    };

    async getByEmail(email) {
        try {
            const userDTO = await this.dao.getByEmail(email);
            return new User(userDTO);
        } catch (error) {
            console.log(`[DEBUG][UserRepository] Error getting user by email: ${error}`);
        }
    };

    async getByEmailAndPassword(email, password) {
        try {
            const userDTO = await this.dao.getByEmail(email);
            if (userDTO) {
                if (await comparePassword(password, userDTO.password)) {
                    return new User(userDTO);
                }
            }
            throw new Error("Invalid credentials");
        } catch (error) {
            console.log(`[DEBUG][UserRepository] Error comparing password: ${error}`);
        }
    };
};

/* Exports */

export default UserRepository;