const express = require('express');
const router = express.Router();
const { Task } = require('../schemas');

const getTasks = (req, res, next) => {

};

const getTask = (req, res, next) => {

};

const addTask = (req, res, next) => {

};

const removeTask = (req, res, next) => {

};

const updateTask = (req, res, next) => {

};

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/:id', addTask);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);

module.exports = router;

