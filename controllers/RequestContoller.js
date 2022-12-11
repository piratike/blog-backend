/**
 * Class to create the Response controller.
 * Used in all the other controllers to manage
 * responses to the client.
 * 
 */

module.exports = class RequestController {

    static sendSuccess(res, message) {

        try {

            /**
             * Send a Success request to the client
             */

            return res.send({
                Result: "Success",
                Message: message
            });

        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

    static sendError(res, message) {

        try {

            /**
             * Send an Error request to the client
             */

            return res.send({
                Result: "Error",
                Message: message
            });


        } catch (error) {

            return res.send({
                Result: "Error",
                Message: error
            });

        }

    }

}
