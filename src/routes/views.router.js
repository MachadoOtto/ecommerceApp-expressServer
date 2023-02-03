const { Router } = require('express');
const ProductManager = require('../controller/ProductManager.js');

const viewsRouter = Router();

let counter = 0;

// Home Page. Displays all products contained in the database.
viewsRouter.get('/', async (req, res) => {
    let products = await new ProductManager('./products.json').getProducts();
    res.render('home', { products });
    console.log(products);
});

viewsRouter.get('/counter', (req, res) => {
    res.render('counter', { counter });
    ++counter;
});

module.exports = viewsRouter;