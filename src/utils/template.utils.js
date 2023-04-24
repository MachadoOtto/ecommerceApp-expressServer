/* Ecommerce Server - Final Project */
// Archive: template.utils.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Main Logic */

/**
 * Send an email using the ticket template.
 */
export const ticketTemplate = () => {
    return `
        <div style="width: 100%; height: 100%; background-color: #f2f2f2; padding: 20px;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
                <div style="width: 100%; text-align: center;">
                    <img src="https://raw.githubusercontent.com/MachadoOtto/ecommerceApp-expressServer/main/public/images/logo-black.png" alt="eStorage Products" style="width: 200px; height: 200px;">
                </div>
                <div style="width: 100%; text-align: center;">
                    <h1 style="font-size: 2rem; font-weight: 600; color: #000;">eStorage Products</h1>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: #000;">Ticket #{ticket.code}</h2>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{user.name} {user.surname}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{user.email}</h3>
                </div>
                <div style="width: 100%; text-align: center;">  
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{ticket.date}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{ticket.time}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{ticket.message}</h3>
                </div>
                <div style="width: 100%; text-align: center;">
                    <h3 style="font-size: 1.2rem; font-weight: 600; color: #000;">{ticket.answer}</h3>
                </div>
            </div>
        </div>
    `;
};