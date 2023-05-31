/* Ecommerce Server - Final Project */
// Archive: auth.middleware.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Main Middleware Logic */

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) { // User is authenticated
        return next();
    }
    return res.redirect(303, '/login'); // User is not authenticated, redirect to login
};

const restrictSessionRoutes = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect(303, '/profile'); // If a session exists, redirect to profile
    }
    return next();
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'Admin') { // User is authenticated and is admin
        return next();
    }
    return res.redirect(303, '/'); // User is not authenticated or is not admin, redirect to home
};

const notAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role !== 'Admin') { // User is authenticated and is not admin
        return next();
    }
    return res.redirect(303, '/'); // User is not authenticated or is not admin, redirect to home
};

const isUser = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'User') { // User is authenticated and is user
        return next();
    }
    return res.redirect(303, '/'); // User is not authenticated or is not user, redirect to home
};

/* Exports */

export default { isAuthenticated, restrictSessionRoutes, isAdmin, notAdmin, isUser };