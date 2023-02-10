/**
 * Validator for the Body of an Article
 * 
 */

module.exports = class ArticleBodyValidator {

    static isValidBody(body) {

        return body.match(/(?s)((?:[^\n][\n]?)+)/g);

    }

}
