/**
 * Class to create the Like controller.
 * Used in the /likes endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const LikeCreator = require('../services/LikeCreator.js');
const LikeFinder = require('../services/LikeFinder.js');
const LikeRemover = require('../services/LikeRemover.js');

module.exports = class LikeController {

    static createNewLike(req, res) {

        try {

            /**
             * For a new Like is needed:
             * - Article ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                article_id: req.body.article_id,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.article_id || !data.user_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            LikeFinder.findLike(data, function(like) {

                if(like)
                    return RequestController.sendError(res, 'Already exists a like from that user in that article.');

                LikeCreator.createLike(data, function(newLike) {

                    if(!newLike)
                        return RequestController.sendError(res, 'Something went wrong while creating the like.');

                    return RequestController.sendSuccess(res, newLike);

                });

            });

        } catch (error) {

            return RequestContoller.sendError(res, error);

        }

    }

    static getLikesFromArticle(req, res) {

        try {

            /**
             * Returns all Likes from an Article
             */

            const article_id = req.params.articleId;

            // Check if all data needed is there
            if(!article_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            LikeFinder.findLikesFromArticle(article_id, function(likes) {

                if(!likes)
                    return RequestController.sendError(res, 'Something went wrong.');

                return RequestController.sendSuccess(res, likes);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static removeLike(req, res) {

        try {

            /**
             * For delete an Like is needed:
             * - Like ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
            const data = {
                like_id: req.params.likeId,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.like_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Delete the Article
            LikeRemover.deleteLike(data, function(like) {

                if(!like)
                    return RequestController.sendError(res, 'Something went wrong, the Like does not exists or the token is not from the author.');

                return RequestController.sendSuccess(res, 'Like removed.');

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

}
