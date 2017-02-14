const { Strategy } = require('passport-local');
const { createHash } = require('crypto');
const { userService } = require('../services');

const strategy = new Strategy((username, password, done) => {
    const encryptedPass = createHash('md5').update(password).digest('hex');

    userService.getUser(username)
        .then((user) => {
            if (user) {
                if (user.password === encryptedPass) {
                    return done(null, {
                        id: user._id,
                        username: user.username
                    });
                }
                return done(null, false, { message: 'Password is incorrect' });
            }

            return done(null, false, { message: 'Username is incorrect' });
        })
        .catch((err) => {
            throw err;
        });
});

module.exports = strategy;