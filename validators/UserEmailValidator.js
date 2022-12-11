/**
 * Validator for the Email of a User
 * 
 */

module.exports = class UserEmailValidator {

    static isValidEmail(email) {

        return email.match(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    }

}
