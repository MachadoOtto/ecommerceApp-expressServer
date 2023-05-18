/* Ecommerce Server - Final Project */
// Archive: nodemailer.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import nodemailer from 'nodemailer';
import Config from './config.js';
import { ticketTemplate } from '../utils/template.utils.js';
import Logger from '../config/logger.config.js'

/* Main Logic */

const log = new Logger();

class NodemailerTransporter{
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: Config.getNodemailerEmail(),
                pass: Config.getNodemailerPassword()
            }
        });
    };

    async sendEmailTicket(ticket) {
        try {
            this.transporter.sendMail({
                from: Config.getNodemailerEmail(),
                to: ticket.purchaser.email,
                subject: `eStorage Products - Ticket #${ticket.code}`,
                html: ticketTemplate(ticket)
            });
        } catch (error) {
            log.logger.error(`[NodemailerTransporter] Error sending email: ${error}`);
        };
    };        
};

/* Exports */

export default NodemailerTransporter;