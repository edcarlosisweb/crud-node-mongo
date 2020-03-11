const mongooose = require('../../database');
const bcript = require('bcryptjs');

const TaskSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true
    },
    project: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    assignedTo: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Task = mongooose.model('Task', TaskSchema);

module.exports = Task;