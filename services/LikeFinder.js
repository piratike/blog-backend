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

        } catch {

            callback(false);

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

        } catch {

            callback(false);

        }

    }

    static findAllLikes(callback) {

        try {

            return Like.find({}, function(err, likes) {

                if(err)
                    callback(err);

                else {

                    let likes_list = [];

                    for(let i = 0 ; i < likes.length ; i++) {

                        if(likes_list[likes[i].article._id])
                            likes_list[likes[i].article._id]++;

                        else
                            likes_list[likes[i].article._id] = 1;

                    }

                    callback(likes_list);

                }

            });

        } catch {

            callback(false);

        }

    }

}
