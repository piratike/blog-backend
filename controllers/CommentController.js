/**
 * Class to create the Comment controller.
 * Used in the /comments endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const CommentCreator = require('../services/CommentCreator.js');
const CommentFinder = require('../services/CommentFinder.js');
const CommentUpdater = require('../services/CommentUpdater.js');
const CommentRemover = require('../services/CommentRemover.js');
const CommentBodyValidator = require('../validators/CommentBodyValidator.js');

module.exports = class CommentController {

    static createNewComment(req, res) {

        try {

            /**
             * For a new Comment is needed:
             * - Title
             * - Body
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.headers['authorization'].split(' ')[1]);
            const data = {
                body: req.body.body,
                article_id: req.body.article_id,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.body || !data.article_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!CommentBodyValidator.isValidBody(data.body))
                return RequestController.sendError(res, 'Body should have some content.');

            // Check if exists an comment with that title
            CommentFinder.findCommentInArticle(data, function(comment) {

                if(comment)
                    return RequestController.sendError(res, 'An comment in that article from that user already exists.');

                // Create the Comment
                CommentCreator.createComment(data, function(newComment) {

                    if(!newComment)
                        return RequestController.sendError(res, 'Something went wrong while creating the comment.');

                    return RequestController.sendSuccess(res, newComment);

                });

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static getCommentsFromArticle(req, res) {

        try {

            /**
             * Returns a Comment
             */

            const article_id = req.params.articleId;

            // Check if all data needed is there
            if(!article_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if exists a comment with that id to send it
            CommentFinder.findCommentsFromArticle(article_id, function(comments) {

                if(!comments)
                    return RequestController.sendError(res, 'Something went wrong.');

                return RequestController.sendSuccess(res, comments);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static getComment(req, res) {

        try {

            /**
             * Returns a Comment
             */

            const id = req.params.commentId;

            // Check if all data needed is there
            if(!id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if exists a comment with that id to send it
            CommentFinder.findCommentById(id, function(comment) {

                if(!comment)
                    return RequestController.sendError(res, 'A comment with that ID does not exists.');

                return RequestController.sendSuccess(res, comment);

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static updateComment(req, res) {

        try {

            /**
             * For update an Comment is needed:
             * - Comment ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.headers['authorization'].split(' ')[1]);
            const data = {
                comment_id: req.params.commentId,
                comment_body: req.body.body,
                article_id: req.body.article_id,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.comment_id || !data.comment_body)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!CommentBodyValidator.isValidBody(data.comment_body))
                return RequestController.sendError(res, 'Body should have some content.');

            // Update the Comment
            CommentUpdater.updateComment(data, function(comment) {

                if(!comment)
                    return RequestController.sendError(res, 'Something went wrong, the Comment does not exists or the token is not from the author.');

                return RequestController.sendSuccess(res, {id: comment._id});


            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static removeComment(req, res) {

        try {

            /**
             * For delete an Comment is needed:
             * - Comment ID
             * - Token, where we get user ID
             */

            const tokenInfo = JwtVerifier.verifyJwt(req.headers['authorization'].split(' ')[1]);
            const data = {
                comment_id: req.params.commentId,
                user_id: tokenInfo.user_id
            };

            // Check if all data needed is there
            if(!data.comment_id)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Delete the Comment
            CommentRemover.deleteComment(data, function(comment) {

                if(!comment)
                    return RequestController.sendError(res, 'Something went wrong, the Comment does not exists or the token is not from the author.');

                return RequestController.sendSuccess(res, 'Comment removed.');


            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

}
