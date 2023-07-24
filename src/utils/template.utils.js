/* Ecommerce Server - Final Project */
// Archive: template.utils.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import Config from "../config/config.js";

/* Main Logic */

/**
 * Send an email using the ticket template.
 */
export const ticketTemplate = (ticket) => {
    let template = `
        <div style="width: 100%; height: 100%; background-color: #f2f2f2; padding: 20px;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
                <div style="width: 100%; text-align: center;">
                    <img src="https://raw.githubusercontent.com/MachadoOtto/ecommerceApp-expressServer/main/public/images/logo-black.png" alt="eStorage Products" style="width: 200px; height: 200px;">
                </div>
                <div style="width: 100%; text-align: center;">
                    <h1 style="font-size: 2rem; font-weight: 600; color: #000;">eStorage Products</h1>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: #000;">Ticket #${ticket.code}</h2>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">${ticket.purchaser.email}</h3>
                </div>
                <div style="width: 100%; text-align: center;">  
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">${ticket.purchase_datetime}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <hr style="width: 100%; height: 1px; background-color: #000;">
                </div>`;
    ticket.purchased_products.forEach((p) => {
        template += `
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">${p.product.title} | ${p.quantity} | $${p.product.price}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <hr style="width: 100%; height: 1px; background-color: #000;">
                </div>`;
    });
    template += `
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">Total: $${ticket.amount}</h3>
                </div>
            </div>
        </div>`;
    return template;
};

/**
 * Send an email using the password reset template.
 */
export const passwordResetTemplate = (token) => {
    let templete = `
        <div style="width: 100%; height: 100%; background-color: #f2f2f2; padding: 20px;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
                <div style="width: 100%; text-align: center;">
                    <img src="https://raw.githubusercontent.com/MachadoOtto/ecommerceApp-expressServer/main/public/images/logo-black.png" alt="eStorage Products" style="width: 200px; height: 200px;">
                </div>
                <div style="width: 100%; text-align: center;">
                    <h1 style="font-size: 2rem; font-weight: 600; color: #000;">eStorage Products</h1>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: #000;">Password Reset</h2>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">Click on the button below to reset your password.</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <a href="http://${Config.getDomain()}:${Config.getPort()}/passwordChange/${token}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; font-size: 1.2rem; font-weight: 600;">Reset Password</a>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">If you did not request a password reset, please ignore this email.</h3>
                </div>
            </div>
        </div>`;
    return templete;
};

/**
 * Send an email using the product deleted template.
 */
export const productDeletedTemplate = (product) => {
    let templete = `
        <div style="width: 100%; height: 100%; background-color: #f2f2f2; padding: 20px;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
                <div style="width: 100%; text-align: center;">
                    <img src="https://raw.githubusercontent.com/MachadoOtto/ecommerceApp-expressServer/main/public/images/logo-black.png" alt="eStorage Products" style="width: 200px; height: 200px;">
                </div>
                <div style="width: 100%; text-align: center;">
                    <h1 style="font-size: 2rem; font-weight: 600; color: #000;">eStorage Products</h1>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: #000;">Product Deleted</h2>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">The product ${product.title} (${product._id}) has been deleted.</h3>
                </div>
            </div>
        </div>`;
    return templete;
};