/* Ecommerce Server - Final Project */
// Archive: sessions.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import passport from 'passport';
import SessionController from '../controllers/sessions.controller.js';
import middlewares from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const sessionRouter = Router();
const restrictSessionRoutes = middlewares.restrictSessionRoutes;

/* Routes */

sessionRouter.route('/login')
    .post(restrictSessionRoutes, passport.authenticate('login', {
        failureRedirect: '/login?error=1'}), SessionController.loginUser);

sessionRouter.route('/register')
    .post(restrictSessionRoutes, passport.authenticate('register', {
        successRedirect: '/login?success=1',
        failureRedirect: '/register?error=1'
        }));

sessionRouter.route('/github').
    get(passport.authenticate('github', { scope: [ 'user:email' ] }), async (req, res) => { } );

sessionRouter.route('/githubcallback').
    get(passport.authenticate('github', { failureRedirect: '/login?error=1' }), SessionController.loginUser);

sessionRouter.route('/logout')
    .get(SessionController.logoutUser);

sessionRouter.route('/user/cart')
    .get(SessionController.getUserCart);

/* Exports */

export default sessionRouter;