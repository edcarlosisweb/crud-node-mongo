const errors = require('../../utils/errors');
const Project = require('../../app/model/project');
const Task = require('../../app/model/Task');

module.exports = {
    async index(req, res) {
        try {
            //populate é usado para retornar os dados das tabelas relacionadas, sem a necessidade de uma nova query
            const projects = await Project.find().populate(['user', 'tasks']);

            return res.send(projects);

        } catch (err) {
            return res.status(400).send(errors.ListError());
        }
    },
    async show(req, res) {
        try {
            //req.params.projectId desta forma o id é passado via url após a barra /id
            //outra possibilidade é receber o id via queryparameters 
            //Ex: const { projectId } = request.query;
            const project = await Project.findById(req.params.projectId).populate('user');

            return res.send(project);

        } catch (err) {
            return res.status(400).send(errors.FindError());
        }
    },
    async store(req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.create({ title, description, user: req.userId });

            await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });

                await projectTask.save();

                project.tasks.push(projectTask);
            }));

            await project.save();

            return res.send({ project });

        } catch (err) {
            return res.status(400).send(errors.CreateProjectFailed());
        }
    },
    async update(req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.findByIdAndUpdate(req.params.projectId,
                {
                    title,
                    description
                }, { new: true });
            // {new: true} o parametro new retorna o objeto atualizado, pois por padrao o mongoose mantem o objeto antigo

           //project.tasks = [];
            // await Task.remove({ project: project_id });

            // await Promise.all(tasks.map(async task => {
            //     const projectTask = new Task({ ...task, project: project._id });

            //     await projectTask.save();

            //     project.tasks.push(projectTask);
            // }));

            await project.save();

            return res.send({ project });

        } catch (err) {
            console.log(err);
            
            return res.status(400).send(errors.UpdateError());
        }
    },
    async delete(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId).populate(['user', 'tasks']);

            return res.send().status(200);

        } catch (err) {
            return res.status(400).send(errors.DeleteError());
        }
    },

}