const { User } = require('../schemas');

const getUser = (username) =>
    User.findOne({ username }).exec();

const addUser = (username, password) => {
    return getUser(username).then((user) => {
        if (user) {
            return {
                error: 'Username is already used'
            }
        }

        return new User({
            username,
            password
        })
            .save()
            .then((user) => ({ user }));
    })
};

module.exports = {
    addUser,
    getUser
};
