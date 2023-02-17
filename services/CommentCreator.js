/**
 * Service to create Comments.
 * 
 */

const Comment = require('../models/Comment.js');

module.exports = class CommentCreator {

    static createComment(data, callback) {

        try {

            // Create the Comment in the database
            Comment.create({
                body: data.body,
                article: data.article_id,
                user: data.user_id
            }, function(err, article) {

                if(err)
                    callback(false);

                else
                    callback(article);

            });

        } catch {

            callback(false);

        }

    }

}
