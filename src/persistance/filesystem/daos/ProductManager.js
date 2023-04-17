/* Ecommerce Server - Final Project */
// Archive: ProductManager.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import fs from 'fs';
import Product from '../models/Product.js';

/* Auxiliar functions */

/**
 * Checks if a field has a valid value.
 * @param {String} field Value of the field to check.
 * @param {String} fieldName Name of the field to check.
 * @returns {Boolean} `true` if the field is valid, `false` otherwise.
 * @throws {Error} If the field is invalid.
 */
const checkField = (field, fieldName) => {
    switch (fieldName) {
        case 'title':
        case 'description':
        case 'code':
        case 'category':
            if (!field || String(field).trim() === '') {
                throw new Error(`The field ${fieldName} is required`);
            }
            return true;
        case 'thumbnails':
            if (!Array.isArray(field)) {
                throw new Error(`The field ${fieldName} must be an array`);
            }
            let auxThumbnails = field.filter(elements => {
                return (elements != null && elements !== undefined && elements !== "");
            });
            if (!auxThumbnails) {
                throw new Error(`The field ${fieldName} must have at least one valid element`);
            }
            return true;
        case 'id':
        case 'price':
        case 'stock':
            if (!isFinite(String(field).trim() || NaN)) {
                throw new Error(`The field ${fieldName} must be a number`);
            }
            return true;
        case 'status':
            return true;
        default:
            throw new Error(`The field ${fieldName} is not valid`);
    }
}

/**
 * Generates a JSON string with the lastId and the products array.
 * @param {Number} lastId Last id of the products array.
 * @param {Array<Product>} products Array of `Product` objects.
 * @returns {String} JSON string with the lastId and the products array.
 */
const generateProductJSON = (lastId, products) => {
    return JSON.stringify({ lastId: lastId, products: products }, null, '\t');
}

/* Class ProductManager */

class ProductManager {
    #lastId;
    #path;

    constructor(path) {
        this.#lastId = 0;
        this.#path = path;
        // If the file does not exist, it is created and initialized with an empty array of products.
        if (!fs.existsSync(this.#path)) {
            fs.writeFileSync(this.#path, generateProductJSON(this.#lastId, []));
        } else {
            // If the file exists, the lastId is read from it.
            let prodMngrObj = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            this.#lastId = prodMngrObj.lastId;
        }
    }
    
    /**
     * Validates that the product object has all the required fields and that they are valid.
     * @param {Product} product `Product` class object to be validated.
     * @returns {Boolean} `true` if the product is valid, `false` otherwise.
     */
    validateProduct(product) {
        let res = true;
        Object.keys(product).forEach(key => res = res && checkField(product[key], key));
        return res;
    }

    /**
     * Validates that the product code does not exist in the `products` array.
     * @param {String} code A product code string to be validated.
     * @param {Array<Product>} products An array of `Product` objects to be validated against.
     * @returns `true` if the code is valid, `false` otherwise.
     */
    validateCode(code, products) {
        let res = products.find(p => p.code === code);
        return (res === undefined);
    }

    /**
     * Adds a new `Product` to the `products` array and saves it to the file.
     * @param {Object} obj Object with the `Product` class format.
     * @returns {Product} The added `Product` object.
     * @throws {Error} If `obj` is not a valid `Product` object, or the write operation fails.
     */
    async addProduct(obj) {
        ++this.#lastId;
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).products;
            obj.id = this.#lastId;
            let product = Product.fromJSON(obj);
            this.validateProduct(product);
            if (!this.validateCode(product.code, products)) {
                throw new Error('Code already exists');
            }
            products.push(product);
            await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId, products));
            return product;
        } catch (error) {
            --this.#lastId;
            throw new Error(`The product could not be added: ${error.message}`);
        }
    }

    /**
     * Returns the `Product` object from the `products` array that matches the provided id.
     * @param {Number} id Id of the product to be searched.
     * @returns {Product} An Product class object with the specified id.
     * @throws {Error} If the product is not found, or the read operation fails.
     */
    async getProductById(id) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).products;
            let product = products.find(p => p.id === id);
            if (product === undefined) {
                throw new Error(`Not found: The product with id ${id} does not exist`);
            } else {
                return product;
            }
        } catch (error) {
            throw new Error(`An error occurred while searching for the product with id ${id}: ` + error.message);
        }
    }

    /**
     * Returns an array with all the `Product` objects contained in the `products` array of the ProductManager file.
     * @param {Number} limit Maximum number of products to be returned. If 0 or less, all the products are returned.
     * @returns {Array<Product>} An array of `Product` objects.
     * @throws {Error} If the read operation fails.
     */
    async getProducts(limit = 0) {
        try {
            if (limit < 0) {
                limit = 0;
            }
            let file = await fs.promises.readFile(this.#path, 'utf-8');
            if (limit > 0) {
                return JSON.parse(file).products.slice(0, limit);
            }
            return JSON.parse(file).products;
        } catch (error) {
            throw new Error(`An error occurred while reading the products: ` + error.message);
        }
    }

    /**
     * Returns the quantity of `Product` objects contained in the `products` array of the ProductManager file.
     * @returns {Number} The quantity of `Product` objects.
     */
    async getProductsQuantity() {
        let products = await this.getProducts();
        return products.length;
    }

    /**
     * Updates the data of a `Product` by entering the id and an object with the data to be updated.
     * It will update the data that matches the fields of the `Product` object and are valid, the others will be ignored.
     * @param {Number} id Id of the product to be updated. 
     * @param {Object} obj The object with the data to be updated. 
     * @returns {Product & Array<String>} The updated `Product` object and `errorFields` an array with the fields that cannot be updated.
     * @throws {Error} If the product is not found, or the write operation fails.
     */
    async updateProduct(id, obj) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).products;
            let product = products.find(p => p.id === id);
            if (product === undefined) {
                throw new Error (`Not found: The product with id ${id} does not exist`);
            } else {
                let errorFields = [];
                Object.keys(product).forEach(k => {
                    try {
                        if (obj.hasOwnProperty(k) && checkField(obj[k], k) && k !== 'id') {
                            if (k === 'code' && !this.validateCode(obj[k], products)) {
                                throw new Error('Code already exists');
                            }
                            if (k === 'status') {
                                product[k] = new Boolean(obj[k]);
                            } else {
                                product[k] = obj[k];
                            }
                        }
                    } catch { 
                        errorFields.push(k);
                    }
                });
                await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId, products));
                return errorFields.length > 0 ? {product, errorFields} : product;
            }
        } catch (error) {
            throw new Error(`An error occurred while updating the product with id ${id}: ` + error.message);
        }
    }

    /**
     * Deletes a `Product` from the `products` array that matches the provided id.
     * @param {Number} id The id of the product to be deleted.
     * @returns {Product} The deleted `Product` object.
     * @throws {Error} If the product is not found, or the write operation fails.
     */
    async deleteProduct(id) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).products;
            let product = products.find(p => p.id === id);
            if (product === undefined) {
                throw new Error(`Not found: The product with id ${id} does not exist`);
            } else {
                products = products.filter(p => p.id !== id);
                await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId, products));
                return product;
            }
        } catch (error) {
            throw new Error(`An error occurred while deleting the product with id ${id}: ` + error.message);
        }
    }

    /**
     * Deletes all the `Product` objects contained in the `products` array of the ProductManager file.
     * Also, resets the `lastId` property to 0.
     * @throws {Error} If the write operation fails.
     */
    async deleteAllProducts() {
        try {
            await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId = 0, []));
        } catch (error) {
            throw new Error(`An error occurred while deleting all the products: ` + error.message);
        }
    }
}

/* Exports */

export default ProductManager;