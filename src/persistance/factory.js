/* Ecommerce Server - Final Project */
// Archive: factory.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import MongoDBUserDAO from "./mongo/daos/user.dao.js";

/* Main Factory Logic */

class FactoryDAO {
    /**
     * Returns a DAO object based on the key.
     * @param {String} key - Key to select the DAO.
     * @returns {Object} - DAO object.
     */
    static getUserDAO(key) {
        const userDAO = new Map();
        //userDAO.set('filesystem', FileSystemUserDAO);
        userDAO.set('mongodb', MongoDBUserDAO);
        const DAO = userDAO.get(key);
        return new DAO;
    };
};

/* Exports */

export default FactoryDAO;