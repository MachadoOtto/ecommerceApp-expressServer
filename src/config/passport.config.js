/* Ecommerce Server - Final Project */
// Archive: passport.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import dotenv from 'dotenv';
import SessionService from '../services/sessions.services.js';
import CartService from '../services/carts.services.js';
import { encryptPassword, comparePassword } from '../utils.js';

/* Main Logic */

dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_CART_ID = process.env.ADMIN_CART_ID;
const SSO_PASS = process.env.SSO_PASS;

const adminUser = {
    email: ADMIN_EMAIL,
    first_name: 'Admin',
    last_name: 'Coder',
    age: 99,
    cart: ADMIN_CART_ID,
    role: 'Admin'
};

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { email, first_name, last_name, age } = req.body;
            if (!email || !password || !first_name || !last_name || !age || (email.trim().toLowerCase() === ADMIN_EMAIL)) {
                return done(null, false);
            }
            try {
                let user = await SessionService.getUserByEmail(email);
                if (user) {
                    return done(null, false);
                }
                let cart = await CartService.createCart();
                const newUser = {
                    email,
                    password: await encryptPassword(password),
                    first_name,
                    last_name,
                    age,
                    cart,
                    role: 'User'
                };
                let result = await SessionService.addUser(newUser);
                return done(null, result);
            } catch (error) {
                console.log(`[PASSPORT] Error: ${error}`)
                return done(null, false);
            }
    }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            if (!username || !password) {
                return done(null, false);
            }
            try {
                // Check for hardcoded admin user
                if ((username.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()) && password === ADMIN_PASSWORD) {
                    return done(null, adminUser);
                } else {
                    let user = await SessionService.getUserByEmail(username);
                    if (user) {
                        if (await comparePassword(password, user.password)) {
                            delete user.password;
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                }
            } catch (error) {
                console.log(`[PASSPORT] Error: ${error}`)
                return done(null, false);
            }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await SessionService.getUserByEmail(profile._json.email);
            if (user) {
                return done(null, user);
            } else {
                let cart = await CartService.createCart();
                let newUser = {
                    email: profile._json.email,
                    password: await encryptPassword(SSO_PASS),
                    first_name: profile._json.name,
                    last_name: 'GitHub',
                    age: 69,
                    cart,
                    role: 'User'
                };
                let result = await SessionService.addUser(newUser);
                return done(null, result);
            }
        } catch (error) {
            console.log(`[PASSPORT] Error: ${error}`)
            return done(null, false);
        }
    }));

    passport.serializeUser((user, done) => {
        // Check for hardcoded admin user
        if (user.email === ADMIN_EMAIL) {
            done(null, user.email);
        } else {
            done(null, user._id);
        }
    });

    passport.deserializeUser(async (id, done) => {
        // Check for hardcoded admin user
        if (id === ADMIN_EMAIL) {
            done(null, adminUser);
        } else {
            try {
                let user = await SessionService.getUserById(id);
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                console.log(`[PASSPORT] Error: ${error}`);
                done(error, false);
            }
        }
    });
};

/* Exports */

export default initializePassport;