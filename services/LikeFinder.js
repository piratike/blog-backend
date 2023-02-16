/**
 * Service to list Likes.
 * 
 */

const Like = require('../models/Like.js');

module.exports = class LikeFinder {

    static findLikeById(id, callback) {

        try {

            // Search for the Article ID in the database
            return Like.findOne({ _id: id }, function(err, like) {

                if(err || !like)
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

}
