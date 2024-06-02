const jwt = require('jsonwebtoken');

class TokenService {
    constructor(secret) {
        this.secret = secret;
    }

    sign(payload) {
        return jwt.sign(payload, this.secret);
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err)
                    return reject(err);
                resolve(decoded);
            });
        });
    }
}

module.exports = TokenService;