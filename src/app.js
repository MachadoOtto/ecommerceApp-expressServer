/* Ecommerce Server - Final Project */
// Archive: app.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import dotenv from 'dotenv';
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

/* Main Server Logic */

dotenv.config(); // Read .env file
console.log('[SERVER] Starting server...');
const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_SESSIONS_URL = process.env.MONGODB_SESSIONS_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_TTL = process.env.SESSION_TTL || 150;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const httpServer = app.listen(PORT, () => {
    console.log(`[SERVER] Server running on port ${httpServer.address().port}`);
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

/* MongoDB */

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL, (error) => {
    if (error) {
        console.log('[MONGODB] Cannot connect to database: ', error);
        process.exit(1);
    }
    console.log('[MONGODB] Connected to database.');
});

const MongoStore = mongoStore.create({
    mongoUrl: MONGODB_SESSIONS_URL,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    ttl: SESSION_TTL
});

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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

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