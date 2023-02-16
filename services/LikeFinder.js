/**
 * Service to list Likes.
 * 
 */

const Like = require('../models/Like.js');

module.exports = class LikeFinder {

    static findLike(data, callback) {

        try {

            // Search for the Article ID in the database
            return Like.findOne({ article: data.article_id, user: data.user_id }, function(err, like) {

                if(err)
                    callback(false);

                else
                    callback(like);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

    static findLikesFromArticle(article_id, callback) {

        try {

            // Search for the Likes of an Article
            return Like.find({ article: article_id }, function(err, likes) {

                if(err)
                    callback(false);

                else
                    callback(likes);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}
