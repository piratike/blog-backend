/**
 * Class to create the Article controller.
 * Used in the /articles endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const ArticleCreator = require('../services/ArticleCreator.js');
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

            const data = req.body;

            // Check if all data needed is there
            if(!data.title || !data.body || !data.token)
                RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!ArticleTitleValidator.isValidTitle(data.title))
                RequestController.sendError(res, 'Title should be a valid article title.');

            if(!ArticleBodyValidator.isValidBody(data.body))
                RequestController.sendError(res, 'Body should have some content.');

            // Check if exists an article with that title
            ArticleFinder.findArticleByTitle(data.title, function(article) {

                if(article)
                    RequestController.sendError(res, 'An article with that email already exists.');

                // Create the Article
                ArticleCreator.createArticle(data, function(newArticle) {

                    if(!newArticle)
                        RequestController.sendError(res, 'Something went wrong while creating the article.');

                    const articleToSend = {
                        id: newArticle._id,
                        title: newArticle.title,
                        body: newArticle.body,
                        user: newArticle.user,
                        created_at: newArticle.created_at,
                        updated_at: newArticle.updated_at,
                    };

                    RequestController.sendSuccess(res, articleToSend);

                });

            });

        } catch (error) {

            RequestController.sendError(res, error);

        }

    }

    static getUser(req, res) {

        try {

            /**
             * For get a User, we need his email and his password
             * This is a Login, only the user data will be 
             * given if you provide his credentials, but never
             * his password.
             */

            const data = req.body;
            const email = req.params.userEmail;

            // Check if all data needed is there
            if(!email || !data.user_id)
                RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!UserEmailValidator.isValidEmail(email))
                RequestController.sendError(res, 'Email should be a valid email address.');

            // Check if exists a user with that email
            UserFinder.findUserByEmail(email, function(user) {

                if(!user)
                    RequestController.sendError(res, 'Any user exists with that email.');

                // Compare passwords to check if they match
                if(!PasswordComparer.comparePasswords(data.user_id, user.user_id))
                    RequestController.sendError(res, 'Wrong password.');

                // Create a JWT to the created User
                const token = JwtGenerator.generateJwt(user, function(token) {

                    const userToSend = {
                        id: user._id,
                        name: user.title,
                        email: user.body,
                        token: token
                    };

                    RequestController.sendSuccess(res, userToSend);

                });

            });


        } catch (error) {

            RequestController.sendError(res, error);

        }

    }

    static isAuthenticated(req, res, next) {

        try {

            /**
             * Function to authorise users to access our data
             * using the token they must send with the
             * request.
             */

            const token = req.body.token;

            // Check if all data needed is there
            if(!token)
                RequestController.sendError(res, 'Authorization token not send.');

            else {

                JwtVerifier.verifyJwt(token);
                return next();

            }

        } catch (error) {

            RequestController.sendError(res, error);

        }

    }

}
