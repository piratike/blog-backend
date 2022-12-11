/**
 * Service to find Users.
 * 
 */

const User = require('../models/User.js');

module.exports = class UserFinder {

    static findUserByEmail(email, callback) {

        try {

            return User.findOne({ email: email }, function(err, user) {

                if(err || !user)
                    callback(false);

                else
                    callback(user);

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}