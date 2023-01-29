/* Desafio entregable: Servidor con Express */
// Archivo: CartManager.js
// Autor: Jorge Machado Ottonelli
// CoderHouse - Curso: Programación Backend

/* Imports */

const fs = require('fs');
const Cart = require('../models/Cart.js');

/* Class CartManager */

class CartManager {
    #path;

    constructor(path) {
        this.path = path;
        this.carts = [];
        // If the file does not exist, it is created and initialized with an empty array of carts.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, this.carts);
        }
    }

    async getCarts() {
        return this.carts;
    }

    async getCartById(id) {
        let cart = this.carts.find(cart => cart.id === id);
        if (!cart) {
            throw new Error('Not found: The cart with the specified ID does not exist.');
        }
        return cart;
    }

    async addCart(cart) {
        let newCart = new Cart(cart);
        this.carts.push(newCart);
        return newCart;
    }

    async updateCart(id, cart) {
        let cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex === -1) {
            throw new Error('Not found: The cart with the specified ID does not exist.');
        }
        let newCart = new Cart(cart);
        this.carts[cartIndex] = newCart;
        return newCart;
    }

    async deleteCart(id) {
        let cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex === -1) {
            throw new Error('Not found: The cart with the specified ID does not exist.');
        }
        this.carts.splice(cartIndex, 1);
    }
}

/* Exports */

module.exports = CartManager;