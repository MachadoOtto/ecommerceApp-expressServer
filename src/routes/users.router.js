/* Ecommerce Server - Final Project */
// Archive: users.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import SessionController from '../controllers/sessions.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import upload from '../config/multer.config.js';

/* Main Router Logic */

const usersRouter = Router();
const isAuthenticated = AuthMiddleware.isAuthenticated;

/* Routes */

usersRouter.route('/premium/:id')
    .get(isAuthenticated, SessionController.changeUserRole);

usersRouter.route('/:uid/documents')
    .post(isAuthenticated, upload.any(), SessionController.uploadDocuments);
    
/* Exports */

export default usersRouter;