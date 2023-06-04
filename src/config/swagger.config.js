/* Ecommerce Server - Final Project */
// Archive: swagger.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import swaggerJsDoc from 'swagger-jsdoc';

/* Main Logic */

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Ecommerce Server - Final Project', 
            version: '1.0.0',
            description: 'Ecommerce Server - Final Project - CoderHouse - Backend Programming Course',
            contact: {
                name: 'Jorge Machado Ottonelli',
                github: 'https://github.com/MachadoOtto'
            }
        }
    },
    apis: ['./src/docs/**/*.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

/* Exports */

export default swaggerDocs;