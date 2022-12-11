/**
 * Validator for the Name of a User
 * 
 */

module.exports = class UserNameValidator {

    static isValidName(name) {

        return name.match(/^([A-Za-z]{3,})+$/g);

    }

}
