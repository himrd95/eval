const express = require('express');
const authorization = require('../middleware/authorization');
const protect = require('../middleware/protect');
const Lectures = require('./model');
const routerLecture = express.Router();

routerLecture.get('', async (req, res) => {
	const data = await Lectures.find().lean().exec();
	res.status(200).json(data);
});

routerLecture.post(
	'',
	protect,
	authorization(['instructor', 'admin']),
	async (req, res) => {
		const data = await Lectures.create(req.body);
		res.status(201).json(data);
	},
);

routerLecture.get('/:lecture_id', async (req, res) => {
	const data = await Lectures.findByIdAndUpdate(
		req.params.lecture_id,
	);
	res.status(200).json(data);
});

routerLecture.patch(
	'/:lecture_id',
	protect,
	authorization(['instructor', 'admin']),
	async (req, res) => {
		const data = await Lectures.findByIdAndUpdate(
			req.params.lecture_id,
			req.body,
		);
		res.status(200).json(data);
	},
);

routerLecture.delete(
	'/:lecture_id',
	protect,
	authorization(['instructor', 'admin']),
	async (req, res) => {
		const data = await Lectures.findByIdAndDelete(
			req.params.lecture_id,
		);
		res.status(200).json(data);
	},
);

module.exports = routerLecture;
