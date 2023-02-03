/* Ecommerce Server - Final Project */
// Archive: app.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const viewsRouter = require('./routes/views.router.js');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')

/* Main Server Logic */

console.log('[SERVER] Starting server...');
const app = express();
const httpServer = app.listen(8080, () => {
    console.log('[SERVER] Server running on port 8080');
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

const socketServer = new Server(httpServer);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.use('/test', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.disable('x-powered-by');

/* Socket.io */

socketServer.on('connection', (socket) => {
    console.log('[SOCKET] New connection: ', socket.id);
});

/* Error Handling */

app.on('error', (err) => {
    console.error('[ERR] Error: ', err);
});