/**
 * Validator for the Body of an Comment
 * 
 */

module.exports = class CommentBodyValidator {

    static isValidBody(body) {

        return body.match(/^([A-Za-z 0-9¿?.,:;-_()$€%&#@!¡])+$/g);

    }

}
