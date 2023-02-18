/**
 * Class to create manage the access to endpoints.
 * 
 */

const JwtVerifier = require('../services/JwtVerifier.js');
const RequestController = require('../controllers/RequestContoller.js');

module.exports = class AuthenticationMiddleware {

    static isAuthenticated(req, res, next) {

        //try {

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

                if(JwtVerifier.verifyJwt(token))
                    return next();

                return RequestController.sendError(res, 'Authorization token not valid.');

            }

        //} catch (error) {

        //    return RequestController.sendError(res, error);

        //}

    }

}