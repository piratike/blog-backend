/**
 * Service to list Comments.
 * 
 */

const Comment = require('../models/Comment.js');

module.exports = class CommentFinder {

    static findCommentInArticle(data, callback) {

        try {

            // Search for the Comment in the Article
            return Comment.findOne({ article: data.article_id, user: data.user_id }, function(err, comment) {

                if(err || !comment)
                    callback(false);

                else
                    callback(comment);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

    static findCommentById(id, callback) {

        try {

            // Search for the Comment ID in the database
            return Comment.findOne({ _id: id }, function(err, comment) {

                if(err || !comment)
                    callback(false);

                else
                    callback(comment);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}