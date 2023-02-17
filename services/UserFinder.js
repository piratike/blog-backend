/**
 * Service to find Users.
 * 
 */

const User = require('../models/User.js');

module.exports = class UserFinder {

    static findUserByEmail(email, callback) {

        try {

            // Search for the User email in the database
            return User.findOne({ email: email }, function(err, user) {

                if(err || !user)
                    callback(false);

                else
                    callback(user);

            });

        } catch {

            callback(false);

        }

    }

}