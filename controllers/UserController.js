/**
 * Class to create the User controller.
 * Used in the /users endpoints.
 * 
 */

const JwtGenerator = require('../services/JwtGenerator.js');
const JwtVerifier = require('../services/JwtVerifier.js');
const PasswordEncryptor = require('../services/PasswordEncryptor.js');
const PasswordComparer = require('../services/PasswordComparer.js');
const RequestController = require('../controllers/RequestContoller.js');
const UserCreator = require('../services/UserCreator.js');
const UserFinder = require('../services/UserFinder.js');
const UserNameValidator = require('../validators/UserNameValidator.js');
const UserEmailValidator = require('../validators/UserEmailValidator.js');

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
                return RequestController.sendError(res, 'Some needed data not received.');

            console.log('HERE');
            // Check if data is how it should be
            if(!UserNameValidator.isValidName(data.name))
                return RequestController.sendError(res, 'Name should use 3 or more letters.');

            if(!UserEmailValidator.isValidEmail(data.email))
                return RequestController.sendError(res, 'Email should be a valid email address.');

            // Check if exists a user with that email
            UserFinder.findUserByEmail(data.email, function(user) {

                if(user)
                    return RequestController.sendError(res, 'An user with that email already exists.');

                // Encrypt user password
                data.password = PasswordEncryptor.encryptPassword(data.password);

                // Create the User
                UserCreator.createUser(data, function(newUser) {

                    if(!newUser)
                        return RequestController.sendError(res, 'Something went wrong while creating the user.');

                    // Create a JWT to the created User
                    const token = JwtGenerator.generateJwt(user, function(token) {

                        const userToSend = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            token: token
                        };

                        return RequestController.sendSuccess(res, userToSend);
    
                    });

                });

            });

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static getUser(req, res) {

        try {

            /**
             * For get a User, we need his email and his password
             * This is a Login, only the user data will be 
             * given if you provide his credentials, but never
             * his password.
             */

            const data = req.body;
            const email = req.params.userEmail;

            // Check if all data needed is there
            if(!email || !data.password)
                return RequestController.sendError(res, 'Some needed data not received.');

            // Check if data is how it should be
            if(!UserEmailValidator.isValidEmail(email))
                return RequestController.sendError(res, 'Email should be a valid email address.');

            // Check if exists a user with that email
            UserFinder.findUserByEmail(email, function(user) {

                if(!user)
                    return RequestController.sendError(res, 'Any user exists with that email.');

                // Compare passwords to check if they match
                if(!PasswordComparer.comparePasswords(data.password, user.password))
                    return RequestController.sendError(res, 'Wrong password.');

                // Create a JWT to the created User
                const token = JwtGenerator.generateJwt(user, function(token) {

                    const userToSend = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        token: token
                    };

                    return RequestController.sendSuccess(res, userToSend);

                });

            });


        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

    static isAuthenticated(req, res, next) {

        try {

            /**
             * Function to authorise users to access our data
             * using the token they must send with the
             * request.
             */

            const token = req.body.token;

            // Check if all data needed is there
            if(!token)
                return RequestController.sendError(res, 'Authorization token not send.');

            else {

                JwtVerifier.verifyJwt(token);
                return next();

            }

        } catch (error) {

            return RequestController.sendError(res, error);

        }

    }

}
