/* Ecommerce Server - Final Project */
// Archive: mongo.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';

/* Main Logic */

class Mongo {
    static connect(mongoUrl) {
        mongoose.set('strictQuery', true);
        mongoose.connect(mongoUrl, (error) => {
            if (error) {
                console.log('[MONGODB] Cannot connect to database: ', error);
                process.exit(1);
            }
            console.log('[MONGODB] Connected to database.');
        });
    }

    static getSessionStore(sessionUrl, sessionTTL = 60000) {
        return mongoStore.create({
            mongoUrl: sessionUrl,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: sessionTTL
        });
    }
}

/* Exports */

export default Mongo;