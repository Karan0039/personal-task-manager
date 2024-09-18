const {Tasks} = require('../models/tasks');

/**
 * Creates a new task and adds it to the Tasks collection.
 * @function createTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.subject - Subject of the task.
 * @param {string} req.body.dueDateTime - Due date and time of the task.
 * @param {boolean} req.body.isReminderOn - Whether a reminder should be set for the task.
 * @param {string} req.body.reminderDateTime - Date and time of the reminder.
 * @param {Object} req.body.recurrence - Recurrence settings for the task.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const createTask = async (req, res) => {
  try {
    const {subject, dueDateTime, isReminderOn, reminderDateTime, recurrence} = req.body;
    let userId = req.user._id;
    let task = await Tasks.create({
      subject,
      dueDateTime,
      isReminderOn,
      reminderDateTime,
      recurrence,
      userId,
    });
    return res
      .status(201)
      .send({status: true, message: 'Task created successfully', data: {...task._doc}});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Fetches all tasks associated with the user.
 * @function getAllTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const getAllTasks = async (req, res) => {
  try {
    let userId = req.user._id;
    let tasks = await Tasks.find({userId}).lean();
    return res
      .status(200)
      .send({status: true, message: 'Tasks fetched successfully', data: [...tasks]});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Fetches a task by its ID.
 * @function getTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - ID of the task to fetch.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const getTask = async (req, res) => {
  try {
    const {id} = req.params;
    let task = await Tasks.findById(id).lean();
    return res
      .status(200)
      .send({status: true, message: 'Task fetched successfully', data: {...task}});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Updates a task.
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - ID of the task to update.
 * @param {Object} req.body - Updated task details.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    let task = await Tasks.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {new: true}
    ).lean();
    return res
      .status(200)
      .send({status: true, message: 'Task updated successfully', data: {...task}});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

/**
 * Deletes a task.
 * @function deleteTask
 * @param {Object} req - Express request object.
 * @param {string} req.params.id - ID of the task to delete.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 *
 * @throws {Error} 500 - Internal Server Error
 */
const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    await Tasks.deleteOne({_id: id}).lean();
    return res.status(200).send({status: true, message: 'Task deleted successfully'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = {createTask, getAllTasks, getTask, updateTask, deleteTask};
