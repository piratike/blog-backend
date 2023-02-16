/**
 * Class to create the Comment controller.
 * Used in the /comments endpoints.
 * 
 */

const RequestController = require('../controllers/RequestContoller.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const CommentCreator = require('../services/CommentCreator.js');
const CommentFinder = require('../services/CommentFinder.js');
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

            const tokenInfo = JwtVerifier.verifyJwt(req.body.token);
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

}
