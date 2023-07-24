/* Ecommerce Server - Final Project */
// Archive: carts.test.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { expect } from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';

/* Main Logic */

dotenv.config();

const appURL = `http://${process.env.DOMAIN}:${process.env.PORT}`;
const credentials = {
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD
};
const cartTestId = process.env.TEST_CART_ID;
const productTestId = process.env.TEST_PRODUCT_ID;

/* Test Definitions */

describe('Cart Router', () => {
    describe('GET /api/carts/:id', () => {
        it('should return the cart contents of the user', (done) => {
            // Login the user to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check if the user is redirected to the home page
                    expect(res.header.location).to.equal('/');
                    const sessionCookie = res.header['set-cookie'][0].split(';')[0];
                    // Get the cart contents of the user
                    request(appURL)
                        .get(`/api/carts/${cartTestId}`)
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).to.have.property('data');
                            expect(res.body.data).to.be.an('object');
                            expect(res.body.data).to.have.property('_id');
                            expect(res.body.data._id).to.equal(cartTestId); 
                            expect(res.body.data).to.have.property('products');
                            expect(res.body.data.products).to.be.an('array');
                            done();
                        });
                });
        });

        it('should return an error if the user is not logged in', (done) => {
            request(appURL)
                .get(`/api/carts/${cartTestId}`)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.header.location).to.equal('/');
                    done();
                });
        });
    });

    describe('POST /:cid/product/:pid', () => {
        it('should add a product to the cart', (done) => {
            // Login the user to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check if the user is redirected to the home page
                    expect(res.header.location).to.equal('/');
                    const sessionCookie = res.header['set-cookie'][0].split(';')[0];
                    // Add a product to the cart
                    request(appURL)
                        .post(`/api/carts/${cartTestId}/product/${productTestId}`)
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.equal('Product added to cart successfully.');
                            // Check if the product was added to the cart
                            request(appURL)
                                .get(`/api/carts/${cartTestId}`)
                                .set('Cookie', sessionCookie)
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property('status');
                                    expect(res.body.status).to.equal('success');
                                    expect(res.body).to.have.property('data');
                                    expect(res.body.data).to.be.an('object');
                                    expect(res.body.data).to.have.property('_id');
                                    expect(res.body.data._id).to.equal(cartTestId);
                                    expect(res.body.data).to.have.property('products');
                                    expect(res.body.data.products).to.be.an('array');
                                    expect(res.body.data.products).to.have.lengthOf(1);
                                    expect(res.body.data.products[0]).to.be.an('object');
                                    expect(res.body.data.products[0]).to.have.property('product');
                                    expect(res.body.data.products[0].product._id).to.equal(productTestId);
                                    // Remove the product from the cart
                                    request(appURL)
                                        .delete(`/api/carts/${cartTestId}/product/${productTestId}`)
                                        .set('Cookie', sessionCookie)
                                        .expect(200)
                                        .end((err, res) => {
                                            if (err) return done(err);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property('status');
                                            expect(res.body.status).to.equal('success');
                                            expect(res.body).to.have.property('message');
                                            expect(res.body.message).to.equal('Product removed from cart successfully.');
                                            done();
                                        });
                                });
                        });
                });
        });

        it('should return an error if the user is not logged in', (done) => {
            request(appURL)
                .post(`/api/carts/${cartTestId}/product/${productTestId}`)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.header.location).to.equal('/');
                    done();
                });
        });
    });

    describe('PUT /:cid/product/:pid', () => {
        it('should update the quantity of a product in the cart', (done) => {
            // Login the user to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check if the user is redirected to the home page
                    expect(res.header.location).to.equal('/');
                    const sessionCookie = res.header['set-cookie'][0].split(';')[0];
                    // Add a product to the cart
                    request(appURL)
                        .post(`/api/carts/${cartTestId}/product/${productTestId}`)
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.equal('Product added to cart successfully.');
                            // Update the quantity of the product in the cart
                            request(appURL)
                                .put(`/api/carts/${cartTestId}/product/${productTestId}`)
                                .set('Cookie', sessionCookie)
                                .send({ quantity: 2 })
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property('status');
                                    expect(res.body.status).to.equal('success');
                                    expect(res.body).to.have.property('message');
                                    expect(res.body.message).to.equal('Product quantity modified successfully.');
                                    // Check if the product quantity was updated
                                    request(appURL)
                                        .get(`/api/carts/${cartTestId}`)
                                        .set('Cookie', sessionCookie)
                                        .expect(200)
                                        .end((err, res) => {
                                            if (err) return done(err);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property('status');
                                            expect(res.body.status).to.equal('success');
                                            expect(res.body).to.have.property('data');
                                            expect(res.body.data).to.be.an('object');
                                            expect(res.body.data).to.have.property('_id');
                                            expect(res.body.data._id).to.equal(cartTestId);
                                            expect(res.body.data).to.have.property('products');
                                            expect(res.body.data.products).to.be.an('array');
                                            expect(res.body.data.products).to.have.lengthOf(1);
                                            expect(res.body.data.products[0]).to.be.an('object');
                                            expect(res.body.data.products[0]).to.have.property('product');
                                            expect(res.body.data.products[0].product._id).to.equal(productTestId);
                                            expect(res.body.data.products[0]).to.have.property('quantity');
                                            expect(res.body.data.products[0].quantity).to.equal(2);
                                            // Remove the product from the cart
                                            request(appURL)
                                                .delete(`/api/carts/${cartTestId}/product/${productTestId}`)
                                                .set('Cookie', sessionCookie)
                                                .expect(200)
                                                .end((err, res) => {
                                                    if (err) return done(err);
                                                    expect(res.body).to.be.an('object');
                                                    expect(res.body).to.have.property('status');
                                                    expect(res.body.status).to.equal('success');
                                                    expect(res.body).to.have.property('message');
                                                    expect(res.body.message).to.equal('Product removed from cart successfully.');
                                                    done();
                                                });
                                        });
                                });
                        });
                });
        });

        it('should return an error if the user is not logged in', (done) => {
            request(appURL)
                .put(`/api/carts/${cartTestId}/product/${productTestId}`)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.header.location).to.equal('/');
                    done();
                });
        });
    });

    describe('DELETE /:cid/product/:pid', () => {
        it('should remove a product from the cart', (done) => {
            // Login the user to get the session cookie
            request(appURL)
                .post('/api/sessions/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check if the user is redirected to the home page
                    expect(res.header.location).to.equal('/');
                    const sessionCookie = res.header['set-cookie'][0].split(';')[0];
                    // Add a product to the cart
                    request(appURL)
                        .post(`/api/carts/${cartTestId}/product/${productTestId}`)
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('status');
                            expect(res.body.status).to.equal('success');
                            expect(res.body).to.have.property('message');
                            expect(res.body.message).to.equal('Product added to cart successfully.');
                            // Remove the product from the cart
                            request(appURL)
                                .delete(`/api/carts/${cartTestId}/product/${productTestId}`)
                                .set('Cookie', sessionCookie)
                                .expect(200)
                                .end((err, res) => {
                                    if (err) return done(err);
                                    expect(res.body).to.be.an('object');
                                    expect(res.body).to.have.property('status');
                                    expect(res.body.status).to.equal('success');
                                    expect(res.body).to.have.property('message');
                                    expect(res.body.message).to.equal('Product removed from cart successfully.');
                                    // Check if the product was removed from the cart
                                    request(appURL)
                                        .get(`/api/carts/${cartTestId}`)
                                        .set('Cookie', sessionCookie)
                                        .expect(200)
                                        .end((err, res) => {
                                            if (err) return done(err);
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property('status');
                                            expect(res.body.status).to.equal('success');
                                            expect(res.body).to.have.property('data');
                                            expect(res.body.data).to.be.an('object');
                                            expect(res.body.data).to.have.property('_id');
                                            expect(res.body.data._id).to.equal(cartTestId);
                                            expect(res.body.data).to.have.property('products');
                                            expect(res.body.data.products).to.be.an('array');
                                            expect(res.body.data.products).to.have.lengthOf(0);
                                            done();
                                        });
                                });
                        });
                });
        });

        it('should return an error if the user is not logged in', (done) => {
            request(appURL)
                .delete(`/api/carts/${cartTestId}/product/${productTestId}`)
                .expect(303)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.header.location).to.equal('/');
                    done();
                });
        });
    });
});