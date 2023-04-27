/* Ecommerce Server - Final Project */
// Archive: messages.controller.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MessageService from '../services/messages.service.js';

/* Main Controller Logic */

const messageService = new MessageService();

class MessageController {
    // Returns all messages from database, limited by the limit parameter.
    static async getMessages(req, res) {
        let limit = req.params.limit;
        try {
            const messages = await messageService.getMessages(limit);
            res.send( { status: 'success', data: messages } );
        } catch (error) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to get the messages list.' } );
        }
    };

    // Adds a new message to the database.
    static async newMessage(req, res) {
        let { user, message } = req.body;
        try {
            const newMessage = await messageService.addMessage(user, message);
            res.send( { status: 'success', data: newMessage } );
            res.app.get('io').emit('newMessage', newMessage);
        } catch (error) {
            res.status(500).send( { status: 'error', message: 'Internal Server Error: An error ocurred while trying to add the message.' } );
        }
    };
};

/* Exports */

export default MessageController;