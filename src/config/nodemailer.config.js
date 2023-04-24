/* Ecommerce Server - Final Project */
// Archive: nodemailer.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import nodemailer from 'nodemailer';
import Config from './config.js';
import { ticketTemplate } from '../utils/template.utils.js';

/* Main Logic */

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

    async sendEmailTicket() {
        this.transporter.sendMail({
            from: Config.getNodemailerEmail(),
            to: '@gmail.com',
            subject: `eStorage Products - Ticket #{ticket.code}`,
            html: ticketTemplate()
        });
    };        
};

/* Exports */

export default NodemailerTransporter;