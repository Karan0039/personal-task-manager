const express = require('express');
const {createTask, getAllTasks, getTask, updateTask, deleteTask} = require('../controllers/tasks');
const router = express.Router();

router.post('/create', createTask);

router.get('/get_all', getAllTasks);

router.get('/get/:id', getTask);

router.put('/update/:id', updateTask);

router.delete('/delete/:id', deleteTask);

module.exports = router;
