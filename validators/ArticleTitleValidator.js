/**
 * Validator for the Title of an Article
 * 
 */

module.exports = class ArticleTitleValidator {

    static isValidTitle(title) {

        return title.match(/^([A-Za-z 0-9¿?.,:;-_()$€%&#@!¡]{5,})+$/g);

    }

}
