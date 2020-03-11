const mongooose = require('../../database');
const bcript = require('bcryptjs');

const ProjectSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tasks: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Task',
        require: true
    }],

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Project = mongooose.model('Project', ProjectSchema);

module.exports = Project;