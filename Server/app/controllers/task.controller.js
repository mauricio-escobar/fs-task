const db = require('../models');
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
	console.log('req: ', req.body);
	// Validate request
	if (!req.body.title) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Task
	const task = {
		title: req.body.title,
		description: req.body.description
	};

	// Save Task in the database
	Task.create(task)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating task"
			});
		});
};

// Retireve all Tasks from the database
exports.findAll = (req, res) => {

	const title = req.query.title;
  	var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  	
	// get all tasks
	Task.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tasks"
			});
		});
};

// Find a single Task with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Task.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Task with id=" + id
			});
		});
};

// Update a Task by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Task.update(req.body, {
			where: { id: id }
		})
	.then(num => {
		if (num == 1) {
			res.send({
				message: "Task was updated successfully."
			});
		} else {
			res.send({
				message: 'Cannot update Task with id=' + id + '.'
			});
		};
	})
	.catch(err => {
		res.status(500).send({
			message: 'Error updating Task with id=' + id + '.'
		});
	});
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Task.destroy({
		where: { id: id }
	})
	.then(num => {
		if (num == 1) {
			res.send({
				message: "Task was deleted successfully."
			});
		} else {
			res.send({
				message: 'Cannot delete Task with id=' + id + '.'
			});
		};
	})
};

// Delete all Tasks from the Database
exports.deleteAll = (req, res) => {
	Task.destroy({
		where: {},
		truncate: false
	})
	.then(nums => {
		res.send({ message: nums + 'tasks are deleted successfully.'});
	})
	.catch(err => {
		res.status(500).send({
			message:
				err.message || 'Some error occurred while removing tasks'
		});
	});
};
