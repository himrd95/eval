const express = require('express');
const Students = require('./model');
const routerStudents = express.Router();

routerStudents.get('', async (req, res) => {
	const data = await Students.find().lean().exec();
	res.status(200).json(data);
});

routerStudents.post('', async (req, res) => {
	const data = await Students.create(req.body);
	res.status(201).json(data);
});

routerStudents.get('/:student_id', async (req, res) => {
	const data = await Students.findByIdAndUpdate(
		req.params.student_id,
	);
	res.status(200).json(data);
});

routerStudents.patch('/:student_id', async (req, res) => {
	const data = await Students.findByIdAndUpdate(
		req.params.student_id,
		req.body,
	);
	res.status(200).json(data);
});

routerStudents.delete('/:student_id', async (req, res) => {
	const data = await Students.findByIdAndDelete(
		req.params.student_id,
	);
	res.status(200).json(data);
});

module.exports = routerStudents;
