/**
 * Validator for the Body of an Article
 * 
 */

module.exports = class ArticleBodyValidator {

    static isValidBody(body) {

        return body.match(/^([A-Za-z 0-9¿?.,:;-_()$€%&#@!¡])+$/g);

    }

}
