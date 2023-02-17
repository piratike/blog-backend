/**
 * Service to delete Likes.
 * 
 */

const Like = require('../models/Like.js');

module.exports = class LikeRemover {

    static deleteLike(data, callback) {

        try {

            // Remove the Like from the database
            Like.findOneAndRemove({
                _id: data.like_id,
                user: data.user_id
            }, function(err, like) {

                if(err)
                    callback(false);

                else
                    callback(like);

            });

        } catch {

            callback(false);

        }

    }

}
