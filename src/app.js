/* Desafio entregable: Servidor con Express */
// Archivo: app.js
// Autor: Jorge Machado Ottonelli
// CoderHouse - Curso: Programación Backend

/* Imports */

const fs = require('fs');
const express = require('express');
const ProductManager = require('./controller/ProductManager.js');

/* Auxiliar functions */

/**
 * Initializes the Product Manager. If the file has less than 10 products, it generates a new file with 10 products.
 * @param {ProductManager} productManager The Product Manager instance.
 */
const initializeProductManager = async (productManager) => {
    console.log('[INIT] Initializing Product Manager...');
    let quantity = await productManager.getProductsQuantity();
    if (quantity < 10) {
        console.log('[INIT] Less than 10 products in the file. Generating a new file with 10 products...');
        await productManager.deleteAllProducts();
        await productManager.addProduct({title:"Shrek", description:"Pelicula animada, Dreamworks", price:99.99, tumbnail:"./shrek.png", code:"SRK100", stock:10});
        await productManager.addProduct({title:"Fast and Furious", description:"Pelicula de acción, Universal", price:69.99, tumbnail:"./fast.png", code:"F4ST01", stock:15});
        await productManager.addProduct({title:"Harry Potter", description:"Pelicula de fantasía, Warner", price:79.99, tumbnail:"./harry.png", code:"P0TT3R", stock:20});
        await productManager.addProduct({title:"Toy Story", description:"Pelicula animada, Pixar", price:39.99, tumbnail:"./toy_story.png", code:"T0Y5TR", stock:25});
        await productManager.addProduct({title:"Titanic", description:"Pelicula romántica, Paramount", price:49.99, tumbnail:"./titanic.png", code:"T1T4NC", stock:5});
        await productManager.addProduct({title:"Avatar", description:"Pelicula de ciencia ficción, 20th Century Fox", price:59.99, tumbnail:"./avatar.png", code:"4V4T4R", stock:10});
        await productManager.addProduct({title:"Star Wars", description:"Pelicula de ciencia ficción, Lucasfilm", price:29.99, tumbnail:"./star_wars.png", code:"ST4RWR", stock:15});
        await productManager.addProduct({title:"The Lord of the Rings", description:"Pelicula de fantasía, New Line Cinema", price:59.99, tumbnail:"./lord_of_the_rings.png", code:"L0TR01", stock:20});
        await productManager.addProduct({title:"The Lion King", description:"Pelicula animada, Walt Disney Pictures", price:39.99, tumbnail:"./lion_king.png", code:"LNK1NG", stock:25});
        await productManager.addProduct({title:"The Avengers", description:"Pelicula de superhéroes, Marvel Studios", price:49.99, tumbnail:"./avengers.png", code:"4V3NGR", stock:5});
        console.log('[INIT] File generated successfully!');
    } else {
        console.log('[INIT] 10 or more products in the file. No need to generate a new file.')
    }
    console.log('[INIT] Product Manager initialized successfully!');
}

/* Main Server Logic */
console.log('[SERVER] Starting server...');

const app = express();
const productManager = new ProductManager('./products.json');

initializeProductManager(productManager);

app.use(express.urlencoded({extended: true}));
app.disable('x-powered-by');

// Returns the product list. If the limit parameter is specified, it returns the first N products.
app.get('/products', async (req, res) => {
    let { limit } = req.query;
    console.log(`[GET] ${req.ip} -> /products${limit ? `?limit=${limit}` : ''}`);
    try {
        res.send(JSON.stringify(await productManager.getProducts(parseInt(limit)), null, '\t'));
    } catch (err) {
        res.status(500).send('Internal Server Error: An error ocurred while trying to get the product list.');
    }
});

// Returns the product with the specified ID. If the product doesn't exist, it returns an error.
app.get('/products/:pid', async (req, res) => {
    let { pid } = req.params;
    console.log(`[GET] ${req.ip} -> /products/${pid}`);
    if (!isFinite(String(pid).trim() || NaN) || parseInt(pid) <= 0) {
        res.status(400).send('Bad Request: The product ID must be a number greater than 0.');
    } else {
        try {
            res.send(JSON.stringify(await productManager.getProductById(parseInt(pid)), null, '\t'));
        } catch (err) {
            res.status(404).send('Not Found: The product with the specified ID does not exist.');
        }
    }
});

app.listen(8080, () => {
    console.log('[SERVER] Server running on port 8080');
    console.log('[SERVER] Press Ctrl+C to stop the server.');
});

app.on('error', (err) => {
    console.error('[ERR] Error: ', err);
});