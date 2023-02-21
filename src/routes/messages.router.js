/* Ecommerce Server - Final Project */
// Archive: messages.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import MessageController from '../controllers/messages.controller.js';

/* Main Router Logic */

const messagesRouter = Router();

/* Routes */

messagesRouter.route('/')
    .get(MessageController.getMessages)
    .post(MessageController.newMessage);

/* Exports */

export default messagesRouter;