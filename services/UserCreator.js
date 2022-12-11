/**
 * Service to create Users.
 * 
 */

const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;

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

                else {

                    // Create a JWT to the created User
                    jwt.sign(
                        {
                            user_id: user._id,
                            name: user.name,
                            email: user.email
                        },
                        TOKEN_KEY,
                        {
                            expiresIn: '2h'
                        },
                        function(err, token) {

                            if(err)
                                callback(false);

                            const newUser = {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                token: token
                            };

                            callback(newUser);

                        }
                    );

                }

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}
