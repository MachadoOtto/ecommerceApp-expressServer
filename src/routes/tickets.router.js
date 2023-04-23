/* Ecommerce Server - Final Project */
// Archive: tickets.router.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Router } from 'express';
import TicketController from '../controllers/tickets.controller.js';

/* Main Router Logic */

const ticketsRouter = Router();

/* Routes */

ticketsRouter.route('/')
    .get(TicketController.getTickets);

ticketsRouter.route('/:code')
    .get(TicketController.getTicketByCode);

/* Exports */

export default ticketsRouter;