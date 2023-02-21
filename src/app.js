/* Ecommerce Server - Final Project */
// Archive: app.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import favicon from 'serve-favicon';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import logger from './middlewares/logger.middleware.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
// import cartsRouter from './routes/carts.router.js';
import ProductService from './services/products.services.js';

/* Main Server Logic */

console.log('[SERVER] Starting server...');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`[SERVER] Server running on port ${httpServer.address().port}`);
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

/* MongoDB */

mongoose.connect('mongodb+srv://server:<REDACTED>@ecommerce.vi6swdd.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
    if (error) {
        console.log('[MONGODB] Cannot connect to database: ', error);
        process.exit(1);
    }
    console.log('[MONGODB] Connected to database.');
});

/* Socket.io */

const socketServer = new Server(httpServer);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.use('/', logger, viewsRouter);
app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);

app.disable('x-powered-by');

/* Socket.io */

socketServer.on('connection', async (socket) => {
    console.log('[SOCKET] New connection: ', socket.id);
    socket.emit('products', await ProductService.getProducts());
});

app.set('io', socketServer);

/* Error Handling */

app.on('error', (err) => {
    console.error('[ERR] Error: ', err);
});