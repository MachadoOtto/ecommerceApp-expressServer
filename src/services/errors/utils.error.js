/* Ecommerce Server - Final Project */
// Archive: utils.error.js
// Author: Jorge Machado Ottonelli
// CoderHouse - Course: Backend Programming

/* Imports */

import CustomError from "./custom.error.js";
import ErrorEnum from "./enum.error.js";

/* Main Logic */

class ErrorUtils {
    static cartCreateError(cause) {
        let customError = ErrorEnum.CART_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static cartNotFoundError(cause) {
        let customError = ErrorEnum.CART_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static cartIdRequiredError(cause) {
        let customError = ErrorEnum.CART_ID_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };
    
    static cartModifyError(cause) {
        let customError = ErrorEnum.CART_MODIFY_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static cartProductQuantityRequiredError(cause) {
        let customError = ErrorEnum.CART_PRODUCT_QUANTITY_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static messageCreateError(cause) {
        let customError = ErrorEnum.MESSAGE_CREATE_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static messageNotFoundError(cause) {
        let customError = ErrorEnum.MESSAGE_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static mockingError(cause) {
        let customError = ErrorEnum.MOCKING_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productCreateError(cause) {
        let customError = ErrorEnum.PRODUCT_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productNotFound(cause) {
        let customError = ErrorEnum.PRODUCT_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productIdRequiredError(cause) {
        let customError = ErrorEnum.PRODUCT_ID_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productUpdateFieldsError(cause) {
        let customError = ErrorEnum.PRODUCT_UPDATEFIELDS_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productModifyError(cause) {
        let customError = ErrorEnum.PRODUCT_MODIFY_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productDeleteError(cause) {
        let customError = ErrorEnum.PRODUCT_DELETE_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static productAmountRequiredError(cause) {
        let customError = ErrorEnum.PRODUCT_AMOUNT_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userCreateError(cause) {
        let customError = ErrorEnum.USER_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userNotFound(cause) {
        let customError = ErrorEnum.USER_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userIdRequiredError(cause) {
        let customError = ErrorEnum.USER_ID_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userDataError(cause) {
        let customError = ErrorEnum.USER_DATA_INVALID;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userEmailRequiredError(cause) {
        let customError = ErrorEnum.USER_EMAIL_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userUpdateError(cause) {
        let customError = ErrorEnum.USER_UPDATE_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static userDataRequiredError(cause) {
        let customError = ErrorEnum.USER_DATA_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static ticketCreateError(cause) {
        let customError = ErrorEnum.TICKET_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static ticketNotFound(cause) {
        let customError = ErrorEnum.TICKET_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static ticketIdRequiredError(cause) {
        let customError = ErrorEnum.TICKET_ID_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static ticketCodeRequiredError(cause) {
        let customError = ErrorEnum.TICKET_CODE_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static tokenCreateError(cause) {
        let customError = ErrorEnum.TOKEN_ERROR;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static tokenNotFoundError(cause) {
        let customError = ErrorEnum.TOKEN_NOT_FOUND;
        customError.cause = cause;
        throw new CustomError(customError);
    };

    static tokenRequiredError(cause) {
        let customError = ErrorEnum.TOKEN_REQUIRED;
        customError.cause = cause;
        throw new CustomError(customError);
    };
};

/* Exports */

export default ErrorUtils;