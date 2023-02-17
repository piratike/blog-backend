/**
 * Service to verify JWT.
 * 
 */

const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;

module.exports = class JwtVerifier {

    static verifyJwt(token) {

        try {

            return jwt.verify(token, TOKEN_KEY);

        } catch {

            callback(false);

        }

    }

}