/**
 * Class to create the Article controller.
 * Used in the /articles endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const ArticleCreator = require('../services/ArticleCreator.js');
const ArticleFinder = require('../services/ArticleFinder.js');
const ArticleUpdater = require('../services/ArticleUpdater.js');
const ArticleRemover = require('../services/ArticleRemover.js');
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
                    return RequestController.sendError(res, 'An article with that title already exists.');

                // Create the Article
                ArticleCreator.createArticle(data, function(newArticle) {

                    if(!newArticle)
                        return RequestController.sendError(res, 'Something went wrong while creating the article.');

                    return RequestController.sendSuccess(res, newArticle);

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
                    return RequestController.sendError(res, 'An article with that ID does not exists.');

                return RequestController.sendSuccess(res, article);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static getAllArticles(req, res) {

        try {

            /**
             * Returns all Articles
             */

            ArticleFinder.findAllArticles(function(articles) {

                if(!articles)
                    return RequestController.sendError(res, 'Something went wrong.');

                return RequestController.sendSuccess(res, articles);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static updateArticle(req, res) {

        try {

            /**
             * For update an Article is needed:
             * - Article ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                article_id: req.params.articleId,
                article_title: req.body.title,
                article_body: req.body.body,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.article_id || !data.article_title || !data.article_body)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!ArticleTitleValidator.isValidTitle(data.article_title))
                return RequestController.sendError(res, 'Title should be a valid article title.');

            if(!ArticleBodyValidator.isValidBody(data.article_body))
                return RequestController.sendError(res, 'Body should have some content.');

            // Update the Article
            ArticleUpdater.updateArticle(data, function(article) {

                if(!article)
                    return RequestController.sendError(res, 'Something went wrong, the Article does not exists or the token is not from the author.');

                return RequestController.sendSuccess(res, article);


            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static deleteArticle(req, res) {

        try {

            /**
             * For delete an Article is needed:
             * - Article ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                article_id: req.params.articleId,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.article_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Delete the Article
            ArticleRemover.deleteArticle(data, function(article) {

                if(!article)
                    return RequestController.sendError(res, 'Something went wrong, the Article does not exists or the token is not from the author.');

                return RequestController.sendSuccess(res, 'Article removed.');


            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

}
