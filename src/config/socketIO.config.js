/* Ecommerce Server - Final Project */
// Archive: socketIO.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Server } from 'socket.io';
import MessageService from '../services/messages.service.js';
import ProductService from '../services/products.service.js';

/* Main Logic */

const messageService = new MessageService();

class SocketIO {
    constructor(httpServer) {
        this.io = new Server(httpServer);
        this.io.on('connection', async (socket) => {
            console.log('[SOCKET] New connection: ', socket.id);
            socket.emit('products', await ProductService.getAllProducts());
            socket.emit('messages', await messageService.getMessages());
        });
    };
};

/* Exports */

export default SocketIO;