/* Ecommerce Server - Final Project */
// Archive: app.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

const express = require('express');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')

/* Main Server Logic */

console.log('[SERVER] Starting server...');
const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.disable('x-powered-by');

app.listen(8080, () => {
    console.log('[SERVER] Server running on port 8080');
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

app.on('error', (err) => {
    console.error('[ERR] Error: ', err);
});