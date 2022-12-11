/**
 * Class to create the User controller.
 * Used in the /users endpoints.
 * 
 */

const JwtGenerator = require('../services/JwtGenerator.js');
const RequestController = require('../controllers/RequestContoller.js');
const UserCreator = require('../services/UserCreator.js');
const UserFinder = require('../services/UserFinder.js');
const UserNameValidator = require('../validators/UserNameValidator.js');
const UserEmailValidator = require('../validators/UserEmailValidator.js');
const bcrypt = require('bcryptjs');

module.exports = class UserController {

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
                RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!UserNameValidator.isValidName(data.name))
                RequestController.sendError(res, 'Name should use 3 or more letters.');

            if(!UserEmailValidator.isValidEmail(data.email))
                RequestController.sendError(res, 'Email should be a valid email address.');

            // Check if exists a user with that email
            UserFinder.findUserByEmail(data.email, function(user) {

                if(user)
                    RequestController.sendError(res, 'An user with that email already exists.');

                // Encrypt user password
                const salt = bcrypt.genSaltSync(10);
                const encryptedPassword = bcrypt.hashSync(data.password, salt);
                data.password = encryptedPassword;

                // Create the User
                UserCreator.createUser(req.body, function(newUser) {

                    if(!newUser)
                        RequestController.sendError(res, 'Something went wrong while creating the user.');

                    // Create a JWT to the created User
                    const token = JwtGenerator.generateJwt(user, function(token) {

                        const userToSend = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            token: token
                        };

                        RequestController.sendSuccess(res, userToSend);
    
                    });

                });

            });

        } catch (error) {

            RequestController.sendError(res, error);

        }

    }

    static getUser(req, res) {

        // try {

            /**
             * For get a User, we need his email and his password
             * This is like a Login, only the user data will be 
             * given if you provide his credentials.
             */

            const data = req.body;
            const email = req.params.userEmail;

            // Check if all data needed is there
            if(!email || !data.password)
                RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!UserEmailValidator.isValidEmail(email))
                RequestController.sendError(res, 'Email should be a valid email address.');

            // Check if exists a user with that email
            UserFinder.findUserByEmail(email, function(user) {

                if(!user)
                    RequestController.sendError(res, 'Any user exists with that email.');

                // Compare passwords to check if they match
                if(!bcrypt.compareSync(data.password, user.password))
                    RequestController.sendError(res, 'Wrong password.');

                // Create a JWT to the created User
                const token = JwtGenerator.generateJwt(user, function(token) {

                    const userToSend = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        token: token
                    };

                    RequestController.sendSuccess(res, userToSend);

                });

            });


        // } catch (error) {

        //     RequestController.sendError(res, error);

        // }

    }

}
