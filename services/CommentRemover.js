/**
 * Service to delete Comments.
 * 
 */

const Comment = require('../models/Comment.js');

module.exports = class CommentRemover {

    static deleteComment(data, callback) {

        try {

            // Remove the Comment from the database
            Comment.findOneAndRemove({
                _id: data.comment_id,
                user: data.user_id
            }, function(err, comment) {

                if(err)
                    callback(false);

                else
                    callback(comment);

            });

        } catch {

            callback(false);

        }

    }

}
