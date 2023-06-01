/* Ecommerce Server - Final Project */
// Archive: enum.error.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Custom Error Enum */
const ErrorEnum = {
    "CART_ERROR": { "name": "CartError", "message": "Error creating cart", "code": 101 },
    "CART_NOT_FOUND": { "name": "CartNotFoundError", "message": "Cart not found", "code": 102 },
    "CART_ID_REQUIRED": { "name": "CartIdRequiredError", "message": "Cart ID is required", "code": 103 },
    "CART_MODIFY_ERROR": { "name": "CartModifyError", "message": "Error modifying cart", "code": 104 },
    "CART_PRODUCT_QUANTITY_REQUIRED": { "name": "CartProductQuantityRequiredError", "message": "Cart product quantity is required", "code": 105 },
    "MESSAGE_ERROR": { "name": "MessageError", "message": "Error creating message", "code": 201 },
    "MESSAGE_NOT_FOUND": { "name": "MessageNotFoundError", "message": "Message not found", "code": 202 },
    "MOCKING_ERROR": { "name": "MockingError", "message": "Error mocking data", "code": 1001 },
    "PRODUCT_ERROR": { "name": "CartError", "message": "Error creating product", "code": 301 },
    "PRODUCT_NOT_FOUND": { "name": "ProductNotFoundError", "message": "Product not found", "code": 302 },
    "PRODUCT_ID_REQUIRED": { "name": "ProductIdRequiredError", "message": "Product ID is required", "code": 303 },
    "PRODUCT_UPDATEFIELDS_REQUIRED": { "name": "ProductUpdateFieldsRequiredError", "message": "Fields to update are required", "code": 304 },
    "PRODUCT_MODIFY_ERROR": { "name": "ProductModifyError", "message": "Error modifying Product", "code": 305 },
    "PRODUCT_DELETE_ERROR": { "name": "ProductDeleteError", "message": "Error deleting Product", "code": 306 },
    "PRODUCT_AMOUNT_REQUIRED": { "name": "ProductAmountRequiredError", "message": "Product amount to reduce is required", "code": 307 },
    "USER_ERROR": { "name": "UserError", "message": "Error creating User", "code": 401 },
    "USER_NOT_FOUND": { "name": "UserNotFoundError", "message": "User not found", "code": 402 },
    "USER_ID_REQUIRED": { "name": "UserIdRequiredError", "message": "User ID is required", "code": 403 },
    "USER_DATA_INVALID": { "name": "UserDataInvalidError", "message": "User data is invalid", "code": 404 },
    "USER_EMAIL_REQUIRED": { "name": "UserEmailRequiredError", "message": "User email is required", "code": 405 },
    "USER_UPDATE_ERROR": { "name": "UserUpdateError", "message": "Error updating User", "code": 406 },
    "USER_DATA_REQUIRED": { "name": "UserDataRequiredError", "message": "User data is required", "code": 407 },
    "TICKET_ERROR": { "name": "TicketError", "message": "Error creating Ticket", "code": 501 },
    "TICKET_NOT_FOUND": { "name": "TicketNotFoundError", "message": "Ticket not found", "code": 502 },
    "TICKET_ID_REQUIRED": { "name": "TicketIdRequiredError", "message": "Ticket ID is required", "code": 503 },
    "TICKET_CODE_REQUIRED": { "name": "TicketCodeRequiredError", "message": "Ticket Code is required", "code": 504 },
    "TOKEN_ERROR": { "name": "TokenError", "message": "Error creating Token", "code": 601 },
    "TOKEN_NOT_FOUND": { "name": "TokenNotFoundError", "message": "Token not found", "code": 602 },
    "TOKEN_REQUIRED": { "name": "TokenRequiredError", "message": "Token is required", "code": 603 }
};

/* Exports */

export default ErrorEnum;