/**
 * Service to update Comments.
 * 
 */

const Comment = require('../models/Comment.js');

module.exports = class CommentUpdater {

    static updateComment(data, callback) {

        try {

            // Update the Comment in the database
            Comment.findOneAndUpdate({
                _id: data.comment_id,
                user: data.user_id
            },{
                article: data.article_id,
                body: data.comment_body,
                user: data.user_id
            },
            {
                new: true
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