/* Ecommerce Server - Final Project */
// Archive: productList.dto.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import ProductDTO from "./product.dto.js";

/* DTO Class */

class ProductListDTO {
    constructor( {docs, totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage} ) {
        this.products = docs.map( product => new ProductDTO(product) );
        this.totalDocs = totalDocs;
        this.limit = limit;
        this.totalPages = totalPages;
        this.page = page;
        this.pagingCounter = pagingCounter;
        this.hasPrevPage = hasPrevPage;
        this.hasNextPage = hasNextPage;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
    };
};

/* Exports */

export default ProductListDTO;