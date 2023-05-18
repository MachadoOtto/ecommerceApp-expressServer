/* Ecommerce Server - Final Project */
// Archive: socketIO.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { Server } from 'socket.io';
import MessageService from '../services/messages.service.js';
import ProductService from '../services/products.service.js';
import Logger from './logger.config.js';

/* Main Logic */

const messageService = new MessageService();
const productService = new ProductService();
const log = new Logger();

class SocketIO {
    constructor(httpServer) {
        this.io = new Server(httpServer);
        this.io.on('connection', async (socket) => {
            log.logger.http('[SOCKET] New connection: ', socket.id);
            socket.emit('products', await productService.getAllProducts());
            socket.emit('messages', await messageService.getMessages());
        });
    };
};

/* Exports */

export default SocketIO;