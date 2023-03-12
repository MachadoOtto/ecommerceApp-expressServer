/* Ecommerce Server - Final Project */
// Archive: auth.middleware.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Main Middleware Logic */

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) { // User is authenticated
        return next();
    }
    res.redirect('/login'); // User is not authenticated, redirect to login
};

const restrictSessionRoutes = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect('/profile'); // If a session exists, redirect to profile
    }
    return next();
};

/* Exports */

export default { isAuthenticated, restrictSessionRoutes };