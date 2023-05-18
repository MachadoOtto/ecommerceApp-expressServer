/* Ecommerce Server - Final Project */
// Archive: passport.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import SessionService from '../services/sessions.service.js';
import Logger from '../config/logger.config.js';

/* Main Logic */

const LocalStrategy = local.Strategy;

const sessionService = new SessionService();

const log = new Logger();

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { email, first_name, last_name, age } = req.body;
            const payload = {
                email,
                password,
                first_name,
                last_name,
                age
            };
            try {
                const user = await sessionService.registerUser(payload, 'User');
                return done(null, user);
            } catch (error) {
                log.logger.warning(`[PASSPORT] Error: ${error}`)
                return done(null, false);
            }
    }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            if (!username || !password) {
                return done(null, false);
            }
            try {
                const user = await sessionService.loginUser(username, password);
                return done(null, user);
            } catch (error) {
                log.logger.warning(`[PASSPORT] Error: ${error}`)
                return done(null, false);
            }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const githubUser = {
                email: profile._json.email,
                password: '',
                first_name: profile._json.name,
                last_name: 'GitHub',
                age: 69,
                role: 'User'
            };
            const user = await sessionService.githubSSO(githubUser);
            return done(null, user);
        } catch (error) {
            log.logger.warning(`[PASSPORT] Error: ${error}`)
            return done(null, false);
        }
    }));

    passport.serializeUser((user, done) => {
        try {
            done(null, user._id);
        } catch (error) {
            log.logger.warning(`[PASSPORT] Error: ${error}`)
            done(error, false);
        }
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await sessionService.getUserById(id);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            log.logger.warning(`[PASSPORT] Error: ${error}`);
            done(error, false);
        }
    });
};

/* Exports */

export default initializePassport;