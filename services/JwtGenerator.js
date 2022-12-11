/**
 * Service to generate JWT.
 * 
 */

const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;

module.exports = class JwtGenerator {

    static generateJwt(data, callback) {

        jwt.sign(
            {
                user_id: data._id,
                name: data.name,
                email: data.email
            },
            TOKEN_KEY,
            {
                expiresIn: '2h'
            },
            function(err, token) {
        
                if(err)
                    callback(false);

                callback(token);
        
            }
        );

    }

}
