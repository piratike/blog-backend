/**
 * Service to encrypt a password.
 * 
 */

const bcrypt = require('bcryptjs');

module.exports = class PasswordEncryptor {

    static encryptPassword(password) {

        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);

        return encryptedPassword;

    }

}
