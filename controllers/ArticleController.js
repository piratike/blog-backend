/**
 * Class to create the Article controller.
 * Used in the /articles endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const ArticleCreator = require('../services/ArticleCreator.js');
const ArticleFinder = require('../services/ArticleFinder.js');
const ArticleTitleValidator = require('../validators/ArticleTitleValidator.js');
const ArticleBodyValidator = require('../validators/ArticleBodyValidator.js');

module.exports = class ArticleController {

    static createNewArticle(req, res) {

        try {

            /**
             * For a new Article is needed:
             * - Title
             * - Body
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                title: req.body.title,
                body: req.body.body,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.title || !data.body)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!ArticleTitleValidator.isValidTitle(data.title))
                return RequestController.sendError(res, 'Title should be a valid article title.');

            if(!ArticleBodyValidator.isValidBody(data.body))
                return RequestController.sendError(res, 'Body should have some content.');

            // Check if exists an article with that title
            ArticleFinder.findArticleByTitle(data.title, function(article) {

                if(article)
                    return RequestController.sendError(res, 'An article with that email already exists.');

                // Create the Article
                ArticleCreator.createArticle(data, function(newArticle) {

                    if(!newArticle)
                        return RequestController.sendError(res, 'Something went wrong while creating the article.');

                    const articleToSend = {
                        id: newArticle._id,
                        title: newArticle.title,
                        body: newArticle.body,
                        user: newArticle.user,
                        created_at: newArticle.created_at,
                        updated_at: newArticle.updated_at,
                    };

                    return RequestController.sendSuccess(res, articleToSend);

                });

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static getArticle(req, res) {

        try {

            /**
             * Returns an Article by a given title
             */

            const id = req.params.articleId;

            // Check if all data needed is there
            if(!id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if exists an article with that title to send it
            ArticleFinder.findArticleById(id, function(article) {

                if(!article)
                    return RequestController.sendError(res, 'An article with that email does not exists.');

                else
                    return RequestController.sendSuccess(res, article);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

}
