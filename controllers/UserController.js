/**
 * Class to create the User controller.
 * Used in the /users endpoints.
 * 
 */

const UserCreator = require('../services/UserCreator.js');
const UserFinder = require('../services/UserFinder.js');
const bcrypt = require('bcryptjs');

module.exports = class User {

    static createNewUser(req, res) {

        try {

            /**
             * For a new User is needed:
             * - Name
             * - Email
             * - Password
             */

            const data = req.body;

            // Check if all data needed is there
            if(!data.name || !data.email || !data.password)
                return res.send({
                    Result: "Error",
                    Message: "Some needed data not received."
                });

            // Check if data is how it should be
            if(!data.name.match(/^([A-Za-z]{3,})+$/g))
                return res.send({
                    Result: "Error",
                    Message: "Name should use 3 or more letters."
                });

            if(!data.email.match(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
                return res.send({
                    Result: "Error",
                    Message: "Email should be a valid email address."
                });

            // Check if exists a user with that email
            UserFinder.findUserByEmail(data.email, function(user) {

                if(user)
                    return res.send({
                        Result: "Error",
                        Message: "An user with that email already exists."
                    });

                // Encrypt user password
                const salt = bcrypt.genSaltSync(10);
                const encryptedPassword = bcrypt.hashSync(data.password, salt);
                data.password = encryptedPassword;

                // Create the User
                UserCreator.createUser(req.body, function(newUser) {

                    if(!newUser)
                        return res.send({
                            Result: "Error",
                            Message: "Something went wrong while creating the user."
                        });

                    return res.send({
                        Result: "Success",
                        Message: newUser
                    });

                });

            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}
