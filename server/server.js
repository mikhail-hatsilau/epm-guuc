const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('node-uuid');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nconf = require('../config');
const passport = require('./passport');
const mongoose = require('../database');
const router = require('./routes');
const { userService } = require('../services');

const app = express();

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    genid() {
        return uuid.v4();
    },
    secret: nconf.get('session').secret,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(`/api/${nconf.get('apiVersion')}`, router);

app.post('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(403);
        return res.json({
            message: 'Access is denied'
        })
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
           return next(err);
        }

        if (!user) {
           res.status(403);
           res.json(info);
           return;
        }

        req.logIn(user, (err) => {
           if (err) {
               next(err);
           }

           res.json({
               sessionId: req.sessionID
           });
        });
    })(req, res, next);
});

app.use('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(403);
        return res.json({
            message: 'Access is denied'
        })
    }

    const { username, password } = req.body;

    userService.addUser(username, password)
        .then((result) => {
            if (result.error) {
                res.status(403);
                res.json({
                    message: result.error
                });
                return;
            }

            res.json({
                message: 'User registered',
                user: result.user
            });
        })
        .catch((err) => {
            throw err;
        });
});

app.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401);
        res.json({
            message: 'Not authorized'
        });
        return;
    }
    next();
});

app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
        message: 'Logged out'
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

const port = nconf.get('port');

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
