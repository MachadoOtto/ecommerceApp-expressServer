/* Ecommerce Server - Final Project */
// Archive: messages.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import MessageController from '../controllers/messages.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const messagesRouter = Router();
const isAuthenticated = AuthMiddleware.isAuthenticated;
const isUser = AuthMiddleware.isUser;

/* Routes */

messagesRouter.route('/')
    .get(isAuthenticated, MessageController.getMessages)
    .post(isUser, MessageController.newMessage);

/* Exports */

export default messagesRouter;