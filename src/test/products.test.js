/* Ecommerce Server - Final Project */
// Archive: products.test.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { expect } from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';

/* Main Logic */

dotenv.config();

const appURL = `http://${process.env.PORT}:${process.env.PORT}`;
const credentials = {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD
};

const newProduct = {
    title: "Test_Products",
    description: "Test Description",
    price: 100,
    code: "NEW_TEST_CODE",
    status: true,
    stock: 100,
    category: "Test Category",
    thumbnails: ["imageTest.jpg"]
};

const updatedProduct = {
    title: 'Updated_Products',
    description: 'Updated Product Description',
    price: 999,
    code: 'UPDATED_TEST_CODE',
    status: true,
    stock: 999,
    category: 'Updated Category',
    thumbnails: ['update.jpg']
};

const deleteProduct = {
    title: 'Delete_Products',
    description: 'Delete Product Description',
    price: 999,
    code: 'Delete_TEST_CODE',
    status: true,
    stock: 999,
    category: 'Delete Category',
    thumbnails: ['delete.jpg']
};

/* Test Definitions */

describe('Product Router', () => {
    describe('GET /api/products', () => {
        it('should return a list of products', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Get the list of products
                    request(appURL)
                        .get('/api/products')
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).has.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).has.property('payload');
                            expect(res.body.payload).to.be.an('array');
                            expect(res.body).has.property('totalPages');
                            expect(res.body).has.property('prevPage');
                            expect(res.body).has.property('nextPage');
                            expect(res.body).has.property('page');
                            expect(res.body).has.property('hasPrevPage');
                            expect(res.body).has.property('hasNextPage');
                            done();
                        });
                });
        });
    });

    describe('POST /api/products', () => {
        it('should add a new product', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Add a new product
                    request(appURL)
                        .post('/api/products')
                        .set('Cookie', sessionCookie)
                        .send(newProduct)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).has.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).has.property('data');
                            expect(res.body.data).to.be.an('object');
                            expect(res.body.data).has.property('_id');
                            expect(res.body.data).has.property('title');
                            expect(res.body.data.title).to.equal(newProduct.title);
                            expect(res.body.data).has.property('description');
                            expect(res.body.data.description).to.equal(newProduct.description);
                            expect(res.body.data).has.property('price');
                            expect(res.body.data.price).to.equal(newProduct.price);
                            expect(res.body.data).has.property('code');
                            expect(res.body.data.code).to.equal(newProduct.code);
                            expect(res.body.data).has.property('status');
                            expect(res.body.data.status).to.equal(newProduct.status);
                            expect(res.body.data).has.property('stock');
                            expect(res.body.data.stock).to.equal(newProduct.stock);
                            expect(res.body.data).has.property('category');
                            expect(res.body.data.category).to.equal(newProduct.category);
                            expect(res.body.data).has.property('thumbnails');
                            done();
                        });
                });
        });

        it('should return an error if the product already exists', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Add a new product
                    request(appURL)
                        .post('/api/products')
                        .set('Cookie', sessionCookie)
                        .send(newProduct)
                        .expect(500)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                });
        });

        it('should not add a new product if the user is not logged in', (done) => {
            request(appURL)
                .post('/api/products')
                .send(newProduct)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    done();
                });
        });
    });

    describe('PUT /products/:pid', () => {
        let productId;
        const updateData = {
            title: 'New Updated Product',
            description: 'This is a new updated product.',
            price: 100,
            code: 'NEW-UPDATED-PRODUCT',
            status: true,
            stock: 100,
            category: 'New Updated Category',
            thumbnails: ['new_update.jpg']
        };
        it('should update a specific product', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Generate a product to be updated
                    request(appURL)
                        .post('/api/products')
                        .set('Cookie', sessionCookie)
                        .send(updatedProduct)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).has.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).has.property('data');
                            expect(res.body.data).to.be.an('object');
                            expect(res.body.data).has.property('_id');
                            productId = res.body.data._id; // Save the product id for later use
                            // Update the product
                            request(appURL)
                                .put(`/api/products/${productId}`)
                                .set('Cookie', sessionCookie)
                                .send(updateData)
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).has.property('status');
                                    expect(res.body.status).to.equal('success');
                                    expect(res.body).has.property('message');
                                    expect(res.body.message).to.equal('Product updated successfully.');
                                    done();
                                });
                        });
                });
        });

        it('should return an error if the product does not exist', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Update the product
                    request(appURL)
                        .put('/api/products/falseId')
                        .set('Cookie', sessionCookie)
                        .send(updatedProduct)
                        .expect(500)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                });
        });

        it('should not update a product if the user is not logged in', (done) => {
            request(appURL)
                .put(`/api/products/${productId}`)
                .send(updatedProduct)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    done();
                });
        });
    });

    describe('DELETE /products/:pid', () => {
        let productId;
        it('should delete a specific product', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Generate a product to be deleted
                    request(appURL)
                        .post('/api/products')
                        .set('Cookie', sessionCookie)
                        .send(deleteProduct)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).has.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).has.property('data');
                            expect(res.body.data).to.be.an('object');
                            expect(res.body.data).has.property('_id');
                            productId = res.body.data._id; // Save the product id for later use
                            // Delete the product
                            request(appURL)
                                .delete(`/api/products/${productId}`)
                                .set('Cookie', sessionCookie)
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).has.property('status');
                                    expect(res.body.status).to.equal('success');
                                    expect(res.body).has.property('message');
                                    expect(res.body.message).to.equal('Product deleted successfully.');
                                    done();
                                });
                        });
                });
        });

        it('should return an error if the product does not exist', (done) => {
            // Login first to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the home page
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Delete the product
                    request(appURL)
                        .delete('/api/products/falseId')
                        .set('Cookie', sessionCookie)
                        .expect(500)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                });
        });

        it('should not delete a product if the user is not logged in', (done) => {
            request(appURL)
                .delete(`/api/products/${productId}`)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    done();
                });
        });
    });
});