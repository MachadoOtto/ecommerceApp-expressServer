/* Ecommerce Server - Final Project */
// Archive: productList.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */
import Product from "./product.js";

/* Entity Class */

class ProductList {
    constructor( {products, totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage} ) {
        this.products = products.map( product => new Product(product) );
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

export default ProductList;