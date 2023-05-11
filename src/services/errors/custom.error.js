/* Ecommerce Server - Final Project */
// Archive: custom.error.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Custom Error Class */
class CustomError extends Error {
    constructor( { name = "Error", message, cause, code = 1 } ) {
        super(message);
        this.name = name;
        this.cause = cause;
        this.code = code;
    };
};

/* Exports */

export default CustomError;