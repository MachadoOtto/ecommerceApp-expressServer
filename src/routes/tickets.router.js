/* Ecommerce Server - Final Project */
// Archive: tickets.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import TicketController from '../controllers/tickets.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

/* Main Router Logic */

const ticketsRouter = Router();
const isAdmin = AuthMiddleware.isAdmin;
const isAuthenticated = AuthMiddleware.isAuthenticated;

/* Routes */

ticketsRouter.route('/')
    .get(isAdmin, TicketController.getTickets);

ticketsRouter.route('/:code')
    .get(isAuthenticated, TicketController.getTicketByCode);

/* Exports */

export default ticketsRouter;