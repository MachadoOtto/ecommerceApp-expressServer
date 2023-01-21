/* Desafio entregable: Servidor con Express */
// Archivo: ProductManager.js
// Autor: Jorge Machado Ottonelli
// CoderHouse - Curso: Programación Backend 

/* Imports */

const fs = require('fs');

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
        case 'tumbnail':
        case 'code':
            if (!field) {
                throw new Error(`The field ${fieldName} is required`);
            }
            return true;
        case 'id':
        case 'price':
        case 'stock':
            if (!isFinite(String(field).trim() || NaN)) {
                throw new Error(`The field ${fieldName} must be a number`);
            }
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

/* Class Product */

class Product {
    constructor(id, title, description, price, tumbnail, code, stock) {
        this.id = id; // unique id
        this.title = title;
        this.description = description;
        this.price = price;
        this.tumbnail = tumbnail; // path to the image
        this.code = code; // unique code 
        this.stock = stock;
    }
    
    /**
     * Returns a new `Product` object with the data from a valid JSON object.
     * @param {Object} json Object with the `Product` class format.
     * @returns {Product} A new `Product` object.
     */
    static fromJSON(json) {
        return new Product(json.id, json.title, json.description, json.price, json.tumbnail, json.code, json.stock);
    }

    /**
     * Formats the `Product` object data into a string.
     * @returns {String} A string with the `Product` object data.
     */
    toString() {
        return `ID: ${this.id} =>
        Title: ${this.title}
        Description: ${this.description}
        Price: \$${this.price}
        Tumbnail: ${this.tumbnail}
        Code: ${this.code}
        Stock: ${this.stock}`;
    }
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
            let file = await fs.promises.readFile(this.#path, 'utf-8');
            let product = JSON.parse(file).products.find(p => p.id === id);
            if (product === undefined) {
                throw new Error(`The product with id ${id} does not exist`);
            } else {
                return product;
            }
        } catch (error) {
            throw new Error(`An error occurred while searching for the product with id ${id}: ` + error.message);
        }
    }

    /**
     * Returns an array with all the `Product` objects contained in the `products` array of the ProductManager file.
     * @returns {Array<Product>} An array of `Product` objects.
     * @throws {Error} If the read operation fails.
     */
    async getProducts() {
        try {
            let file = await fs.promises.readFile(this.#path, 'utf-8');
            return JSON.parse(file).products;
        } catch (error) {
            throw new Error(`An error occurred while reading the products: ` + error.message);
        }
    }

    /**
     * Updates the data of a `Product` by entering the id and an object with the data to be updated.
     * It will update the data that matches the fields of the `Product` object and are valid, the others will be ignored.
     * @param {Number} id Id of the product to be updated. 
     * @param {Object} obj The object with the data to be updated. 
     * @returns {Product} The updated `Product` object.
     * @throws {Error} If the product is not found, or the write operation fails.
     */
    async updateProduct(id, obj) {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8')).products;
            let product = products.find(p => p.id === id);
            if (product === undefined) {
                throw new Error (`The product with id ${id} does not exist`);
            } else {
                Object.keys(product).forEach(k => {
                    try {
                        if (obj.hasOwnProperty(k) && checkField(obj[k], k) && k !== 'id') {
                            if (k === 'code' && !this.validateCode(obj[k], products)) {
                                throw new Error('Code already exists');
                            }
                            product[k] = obj[k];
                        }
                    } catch { }
                });
                await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId, products));
                return product;
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
                throw new Error(`The product with id ${id} does not exist`);
            } else {
                products = products.filter(p => p.id !== id);
                await fs.promises.writeFile(this.#path, generateProductJSON(this.#lastId, products));
                return product;
            }
        } catch (error) {
            throw new Error(`An error occurred while deleting the product with id ${id}: ` + error.message);
        }
    }        
}

/* Testing code */

/**
 * Test the addProduct method of the ProductManager class.
 */
const testAddProduct = async () => {
    console.log('TEST - AddProduct method testing begins!')
    const productManager = new ProductManager('./products_addProduct.json');
    console.log('Test read of empty file...');
    let product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test adding a valid product...');
    await productManager.addProduct(JSON.parse('{"title":"Shrek", "description":"Pelicula animada, Dreamworks", "price":99.99, "tumbnail":"./shrek.png", "code":"SRK100", "stock":10}'))
        .catch(error => console.log(error.message));
    console.log('Test adding a invalid product...');
    await productManager.addProduct(JSON.parse('{}'))
        .catch(error => console.log(error.message));
    console.log('Test adding a product with an invalid price...');
    await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":"invalid", "tumbnail":"./fastfurious.png", "code":"FF100", "stock":10}'))
        .catch(error => console.log(error.message));
    console.log('Test adding a product with an repeated code...');
    await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":69.99, "tumbnail":"./fastfurious.png", "code":"SRK100", "stock":"10"}'))
        .catch(error => console.log(error.message));
    console.log('Test adding a product with an invalid stock...');
    await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":69.99, "tumbnail":"./fastfurious.png", "code":"FF101", "stock":"invalid"}'))
        .catch(error => console.log(error.message));
    console.log('Test adding another valid product...');
    await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":69.99, "tumbnail":"./fastfurious.png", "code":"FF101", "stock":10}'))
        .catch(error => console.log(error.message));
    console.log('Test search of the product with id 2...');
    product = await productManager.getProductById(2)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test search of the product with id 5 (not found)...');
    product = await productManager.getProductById(5)
        .catch(error => console.log(error.message));
    console.log('Show final list of products...');
    product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('AddProduct test finished!');
}

/**
 * Test the updateProduct method of the ProductManager class.
 */
const testUpdateProduct = async () => {
    console.log('TEST - UpdateProduct method testing begins!')
    const productManager = new ProductManager('./products_updateProduct.json');
    console.log('Initial load of products...');
    try {
        await productManager.addProduct(JSON.parse('{"title":"Shrek", "description":"Pelicula animada, Dreamworks", "price":99.99, "tumbnail":"./shrek.png", "code":"SRK100", "stock":10}'));
        await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":69.99, "tumbnail":"./fastfurious.png", "code":"FF100", "stock":15}'));
        await productManager.addProduct(JSON.parse('{"title":"Harry Potter", "description":"Pelicula de fantasía, Warner", "price":59.99, "tumbnail":"./harrypotter.png", "code":"HP100", "stock":20}'));
        await productManager.addProduct(JSON.parse('{"title":"The Lord of the Rings", "description":"Pelicula de fantasía, New Line", "price":79.99, "tumbnail":"./lordoftherings.png", "code":"LOTR100", "stock":5}'));
        await productManager.addProduct(JSON.parse('{"title":"The Matrix", "description":"Pelicula de ciencia ficción, Warner", "price":49.99, "tumbnail":"./thematrix.png", "code":"TM100", "stock":10}'));
    } catch (error) {
        console.log(error.message);
    }
    let product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a valid product with id 3...');
    await productManager.updateProduct(3, JSON.parse('{"title":"Harry Potter y el Cáliz de Fuego", "description":"Pelicula de fantasía, Warner", "price":59.99, "tumbnail":"./harrypotter4.png", "code":"HP400", "stock":20}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(3)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a product with id 5 and an invalid stock value...');
    await productManager.updateProduct(5, JSON.parse('{"stock":"invalid"}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(5)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a product with id 7 that does not exist...');
    await productManager.updateProduct(7, JSON.parse('{"title":"Harry Potter y el Prisionero de Azkaban"}'))
        .catch(error => console.log(error.message));
    console.log('Test updating a product with id 1 and with invalid or nor existing fields...');
    await productManager.updateProduct(1, JSON.parse('{"title":"Shrek 2", "field":"field", "tumbnail":"./shrek2.png", "code":"SRK200", "invalid":"invalid"}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(1)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a product with id 1 and with empty field values...');
    await productManager.updateProduct(1, JSON.parse('{"title":"", "description":"", "price":"", "tumbnail":"", "code":"", "stock":""}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(1)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a product with id 1 a repeated code...');
    await productManager.updateProduct(1, JSON.parse('{"title":"Shrek 2", "description":"Pelicula animada, Dreamworks", "price":99.99, "tumbnail":"./shrek2.png", "code":"FF100", "stock":10}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(1)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test updating a product with id 1 a new id...');
    await productManager.updateProduct(1, JSON.parse('{"id":7}'))
        .catch(error => console.log(error.message));
    product = await productManager.getProductById(1)
        .catch(error => console.log(error.message));
    console.log(product);
    product = await productManager.getProductById(7)
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Show the final list of products...');
    product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('UpdateProduct test finished!');
}

/**
 * Test the deleteProduct method of the ProductManager class.
 */
const testDeleteProduct = async () => {
    console.log('TEST - DeleteProduct method testing begins!');
    const productManager = new ProductManager('./products_deleteProduct.json');
    console.log('Initial load of products...');
    try {
        await productManager.addProduct(JSON.parse('{"title":"Shrek", "description":"Pelicula animada, Dreamworks", "price":99.99, "tumbnail":"./shrek.png", "code":"SRK100", "stock":10}'));
        await productManager.addProduct(JSON.parse('{"title":"Fast & Furious", "description":"Pelicula de acción, Universal", "price":69.99, "tumbnail":"./fastfurious.png", "code":"FF100", "stock":15}'));
        await productManager.addProduct(JSON.parse('{"title":"Harry Potter", "description":"Pelicula de fantasía, Warner", "price":59.99, "tumbnail":"./harrypotter.png", "code":"HP100", "stock":20}'));
        await productManager.addProduct(JSON.parse('{"title":"The Lord of the Rings", "description":"Pelicula de fantasía, New Line", "price":79.99, "tumbnail":"./lordoftherings.png", "code":"LOTR100", "stock":5}'));
        await productManager.addProduct(JSON.parse('{"title":"The Matrix", "description":"Pelicula de ciencia ficción, Warner", "price":49.99, "tumbnail":"./thematrix.png", "code":"TM100", "stock":10}'));
    } catch (error) {
        console.log(error.message);
    }
    let product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test deleting a product with id 3...');
    await productManager.deleteProduct(3)
        .catch(error => console.log(error.message));
    product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test deleting a product with id 5...');
    await productManager.deleteProduct(5)
        .catch(error => console.log(error.message));
    product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('Test deleting a product with id 7 that does not exist...');
    await productManager.deleteProduct(7)
        .catch(error => console.log(error.message));
    console.log('Test deleting a product with id 3 again...');
    await productManager.deleteProduct(3)
        .catch(error => console.log(error.message));
    console.log('Show the final list of products...');
    product = await productManager.getProducts()
        .catch(error => console.log(error.message));
    console.log(product);
    console.log('DeleteProduct test finished!');
}

// Ejecución de los tests, descomentar  la línea correspondiente para ejecutar el test deseado.
// Eliminar el archivo products_<test_name>.json antes de ejecutar cada test!!!
// testAddProduct();
// testUpdateProduct();
// testDeleteProduct();

// Export of ProductManager class.
module.exports = ProductManager;