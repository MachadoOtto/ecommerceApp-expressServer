const express = require('express');
const fs = require('fs');

const app = express();

const ProductManager = require('./controller/ProductManager.js');

const cargaInicial = async (path) => {
    console.log("Inicializando ProductManager...");
    let productManager = new ProductManager(path);
    await fs.promises.access(path)
        .then(() => {
            console.log(`Se encontró el archivo ${path}. Se cargaran sus datos...`);
            productManager = new ProductManager(path);
        }).catch(async () => {
            console.log(`No se encontró el archivo ${path}. Se creará uno nuevo...`);
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
            console.log(`Archivo ${path} creado con éxito!`)
        });
}

cargaInicial('./products.json');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send('Users \n <a href="/">Home</a>');
});

app.get('/image', (req, res) => {
    console.log(req.ip);
    res.set({'Content-Type': 'image/jpeg'});
    res.sendFile(__dirname + '/img/maria.jpeg');
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

app.on('error', (err) => {
    console.log('Error: ', err);
});