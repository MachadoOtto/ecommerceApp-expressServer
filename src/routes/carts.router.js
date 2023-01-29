/* Desafio entregable: Servidor con Express */
// Archivo: carts.router.js
// Autor: Jorge Machado Ottonelli
// CoderHouse - Curso: Programación Backend

/* Imports */

const { Router } = require('express');
const CartManager = require('../controller/CartManager.js');

/* Main Router Logic */

const cartsRouter = Router();
const cartManager = new CartManager();

/* Routes */