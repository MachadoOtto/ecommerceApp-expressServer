/* Ecommerce Server - Final Project */
// Archive: sessions.test.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import { expect } from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';

/* Main Logic */

dotenv.config();

const appURL = `http://localhost:${process.env.PORT}/api/sessions`;
const credentials = {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD
};

/* Test Definitions */

describe('Session Router', () => {
    describe('POST /login', () => {
        it('should redirect to the error page when login fails', (done) => {
            const fake_credentials = {
                email: process.env.TEST_EMAIL,
                password: 'incorrect_password'
            };
            request(appURL)
                .post('/login')
                .send(fake_credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    // Check that the user is redirected to the login error page
                    expect(res.headers.location).to.equal('/login?error=1');
                    done();
                });
        });

        it('should login a user and redirect to the home page', (done) => {
            request(appURL)
                .post('/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    // Check that the user is redirected to the home page
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    done();
                });
        });
    });
    
    describe('POST /register', () => {
        const newUser = {
            email: process.env.TEST_SECOND_EMAIL,
            password: process.env.TEST_PASSWORD,
            first_name: "UnitTest",
            last_name: "Jr.",
            age: 1
        };
        it('should register a new user', (done) => {
            request(appURL)
                .post('/register')
                .send(newUser)
                .expect(302)
                .end((err, res) => {
                    // Check that the user is redirected to the login page with a success message
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/login?success=1');
                    done();
                });
        });

        it('should redirect to the error page when register a duplicate', (done) => {
            request(appURL)
                .post('/register')
                .send(newUser)
                .expect(302)
                .end((err, res) => {
                    // Check that the user is redirected to the register error page
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/register?error=1');
                    done();
                });
        });
    });

    describe('GET /logout', () => {
        it('should logout a user', (done) => {
            // First login to testuser
            request(appURL)
                .post('/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    // Check that the user is redirected to the home page and obtains a session cookie
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Now logout with the session cookie
                    request(appURL)
                        .get('/logout')
                        .set('Cookie', sessionCookie)
                        .expect(302)
                        .end((err, res) => {
                            // Check that the user is redirected to the home page
                            if (err) return done(err);
                            expect(res.headers.location).to.equal('/login');
                            done();
                        });
                });
        });
    });

    describe('GET /user/cart', () => {
        it('should get the user cart', (done) => {
            // First login to testuser and obtain a session cookie
            request(appURL)
                .post('/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Now get the user cart with the session cookie
                    request(appURL)
                        .get('/user/cart')
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            // Check if the string returned correspond with the test user id cart
                            expect(res.text).to.equal(process.env.TEST_CART_ID);
                            done();
                        });
                });         
        });

        it('should redirect to the login page when the user is not logged in', (done) => {
            request(appURL)
                .get('/user/cart')
                .expect(303)
                .end((err, res) => {
                    // Check that the user is redirected to the login page
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/login');
                    done();
                });
        });
    });

    describe('GET /current', () => {
        it('should get the current session user', (done) => {
            // First login to testuser and obtain a session cookie
            request(appURL)
                .post('/login')
                .send(credentials)
                .expect(302)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/');
                    const sessionCookie = res.headers['set-cookie'][0].split(';')[0];
                    // Now get the current session user with the session cookie
                    request(appURL)
                        .get('/current')
                        .set('Cookie', sessionCookie)
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('email');
                            expect(res.body.email).to.equal(credentials.email);
                            expect(res.body).to.have.property('first_name');
                            expect(res.body).to.have.property('last_name');
                            expect(res.body).to.have.property('age');
                            done();
                        });
                });
        });

        it('should redirect to the login page when the user is not logged in', (done) => {
            request(appURL)
                .get('/current')
                .expect(303)
                .end((err, res) => {
                    // Check that the user is redirected to the login page
                    if (err) return done(err);
                    expect(res.headers.location).to.equal('/login');
                    done();
                });
        });
    });
});