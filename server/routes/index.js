const express = require('express');
const router = express.Router();
const users = require('./users');
const tasks = require('./tasks');

router.use('/users', users);
router.use('/tasks', tasks);

module.exports = router;
