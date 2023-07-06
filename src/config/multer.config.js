/* Ecommerce Server - Final Project */
// Archive: multer.config.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import multer from "multer";

/* Main Logic */

// Multer configuration to save files in different folders
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;
        if (file.fieldname === "profiles") {
            folder = "uploads/profiles";
        } else if (file.fieldname === "products") {
            folder = "uploads/products";
        } else {
            folder = "uploads/documents";
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

// Multer middleware to handle file uploads
const upload = multer({ storage });

/* Exports */
export default upload;