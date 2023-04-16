/* Ecommerce Server - Final Project */
// Archive: app.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import path from 'path';
import __dirname from './utils.js';
import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import favicon from 'serve-favicon';
// Custom Middlewares
import logger from './middlewares/logger.middleware.js';
// Routes
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js';
import productsRouter from './routes/products.router.js';
import sessionRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
// Services
import MessageService from './services/messages.services.js';
import ProductService from './services/products.services.js';
// Passport
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import Config from './config/config.js';
import Mongo from './persistance/mongo/config/mongo.config.js';

/* Main Server Logic */

console.log('[SERVER] Starting server...');
const app = express();
const httpServer = app.listen(Config.getPort(), () => {
    console.log(`[SERVER] Server running on port ${httpServer.address().port}`);
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

/* MongoDB */

Mongo.connect(Config.getMongoDBUrl());

const MongoStore = Mongo.getSessionStore(Config.getMongoDBSessionsUrl(), Config.getSessionTTL());

/* Socket.io */

const socketServer = new Server(httpServer);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

// Sessions
app.use(session({
    store: MongoStore,
    secret: Config.getSessionSecret(),
    resave: false,
    saveUninitialized: false
}));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', logger, viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionRouter);
app.use(function (req, res) {
    let user = req.session.user;
    let isAdmin = false;
    if (user) {
        isAdmin = (user.role === 'Admin');
    }
    res.status(404).render('error', { code: 404, message: "Not Found: The requested resource could not be found.", user, isAdmin });
});

app.disable('x-powered-by');

/* Socket.io */

socketServer.on('connection', async (socket) => {
    console.log('[SOCKET] New connection: ', socket.id);
    socket.emit('products', await ProductService.getAllProducts());
    socket.emit('messages', await MessageService.getMessages());
});

app.set('io', socketServer);

/* Error Handling */

app.on('error', (err) => {
    console.error('[ERR] Error: ', err);
});