const express = require('express');
const router = express.Router();
const { User } = require('../../schemas/User');

const getUsers = (req, res) => {
    res.json({
        success: 'Hello world'
    });
};

const getUser = (req, res) => {

};

const addUser = (req, res) => {

};

const removeUser = (req, res) => {

};

const updateUser = (req, res) => {

};

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/:id', addUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = router;
