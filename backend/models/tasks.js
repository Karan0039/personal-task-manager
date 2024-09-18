const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const tasksSchema = new mongoose.Schema(
  {
    userId: {type: ObjectId, required: true},
    subject: {
      type: String,
      required: true,
    },
    dueDateTime: {
      dateTime: {
        type: String,
        required: true,
      },
      timeZone: {
        type: String,
        required: true,
      },
    },
    isReminderOn: {
      type: Boolean,
      required: true,
      default: false,
    },
    reminderDateTime: {
      dateTime: {
        type: String,
        required: function () {
          return this.isReminderOn;
        },
      },
      timeZone: {
        type: String,
        required: function () {
          return this.isReminderOn;
        },
      },
    },
    recurrence: {
      recurrenceType: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom'],
        required: true,
      },
      intervalType: {
        type: String,
        enum: ['Days', 'Weeks', 'Months', 'Years'],
        default: 'Weeks',
      },
      interval: {
        type: Number,
        default: 1,
      },
      weekDays: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        default: [],
      },
    },
    importance: {
      type: String,
      enum: ['Low', 'Normal', 'High'],
      default: 'Normal',
    },
    note: {
      type: String,
      default: '',
    },
  },
  {timestamps: {createdAt: 'c', updatedAt: 'u'}, versionKey: false}
);

const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = {Tasks};
