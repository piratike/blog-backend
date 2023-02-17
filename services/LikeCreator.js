/**
 * Service to create Likes.
 * 
 */

const Like = require('../models/Like.js');

module.exports = class LikeCreator {

    static createLike(data, callback) {

        try {

            // Create the Article in the database
            Like.create({
                article: data.article_id,
                user: data.user_id
            }, function(err, like) {

                if(err)
                    callback(false);

                else
                    callback(like);

            });

        } catch (error) {

            callback(false);

        }

    }

}
