/**
 * Validator for the Title of an Article
 * 
 */

module.exports = class ArticleTitleValidator {

    static isValidTitle(title) {

        return title.match(/^([A-Za-z]{2,})+$/g);

    }

}
