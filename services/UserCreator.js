/**
 * Service to create Users.
 * 
 */

const User = require('../models/User.js');

module.exports = class UserCreator {

    static createUser(data, callback) {

        try {

            // Create the User in the database
            User.create({
                name: data.name,
                email: data.email,
                password: data.password
            }, function(err, user) {

                if(err)
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
