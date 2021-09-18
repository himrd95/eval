const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const connect = () => {
	mongoose.connect('mongodb://localhost:27017/masaiDB');
};

// API for Batches --------------------------------------------------------
const Batch = mongoose.model(
	'Batch',
	new mongoose.Schema(
		{
			batchName: { type: String, required: true },
			course: { type: String, required: true },
		},
		{ versionKey: false, timestamps: true },
	),
);

app.get('/batch', async (req, res) => {
	const batches = await Batch.find(req.query).lean().exec();
	res.status(200).json({
		[`Total number of ${Object.values(req.query)[0]} course`]:
			batches.length,
		batches: { batches, Student },
	});
});

app.get('/batch/:id/students', async (req, res) => {
	students = await Student.find({ batch: req.params.id })
		.lean()
		.exec();
	const batches = await Batch.findById(req.params.id).lean().exec();
	res.status(200).json({
		[`Total number of students im ${batches.batchName} batch`]:
			students.length,
		batches,
		students,
	});
});

app.get('/batch/maxStudents', async (req, res) => {
	students = await Student.find().populate('batch').lean().exec();
	// console.log(typeof batches[0]._id);
	let max = 0;
	maxBatcSize = '';
	students.map((batch) => {
		count = 0;
		students.map(
			(item) => item.batch._id === batch.batch._id && count++,
		);
		if (max < count) {
			max = count;
			maxBatcSize = batch.batch._id;
		}
	});
	const batches = await Batch.findById(maxBatcSize).lean().exec();
	console.log(maxBatcSize, batches);
	res.status(200).json({
		[`${batches.batchName} batch has the maximum number of students`]: max,
	});
});
app.post('/batch', async (req, res) => {
	const batch = await Batch.create(req.body);
	res.status(201).json(batch);
});

// API for Students --------------------------------------------------------
const Student = mongoose.model(
	'Student',
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			age: { type: Number, required: true },
			gender: { type: String, required: true },
			batch: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Batch',
				required: true,
			},
			status: { type: String, required: false, default: 'Applied' },
		},
		{ versionKey: false, timestamps: true },
	),
);

app.get('/students', async (req, res) => {
	students = await Student.find(req.query)
		.populate('batch')
		.lean()
		.exec();
	res.status(200).json({
		[`Total number of ${Object.values(req.query)[0]} Students`]:
			students.length,
		studentts: students,
	});
});

app.get('/students/compare', async (req, res) => {
	students = await Student.find({ age: { $gt: +req.query.age } })
		.populate('batch')
		.lean()
		.exec();
	res.status(200).json(students);
});

app.post('/students', async (req, res) => {
	const student = await Student.create(req.body);
	res.status(201).json(student);
});

app.patch('/students/:id', async (req, res) => {
	const student = await Student.findByIdAndUpdate(req.body);
	res.status(201).json(student);
});

app.delete('/students/:id', async (req, res) => {
	const student = await Student.findByIdAndDelete(req.body);
	res.status(201).json(student);
});
// app.delete('/students', async (req, res) => {
// 	const users = await User.deleteMany();
// 	res.status(200).json(users);
// });

// API for Instructure --------------------------------------------------------
const Instructure = mongoose.model(
	'Instructure',
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			age: { type: Number, required: true },
			gender: { type: String, required: true },
			batch: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Batch',
				required: true,
			},
		},
		{ versionKey: false, timestamps: true },
	),
);

app.get('/instructure', async (req, res) => {
	// console.log(req.query);
	const instructures = await Instructure.find()
		.populate('batch')
		.lean()
		.exec();
	res.status(200).json(instructures);
});

app.post('/instructure', async (req, res) => {
	const instructure = await Instructure.create(req.body);
	res.status(201).json(instructure);
});

app.patch('/instructure/:id', async (req, res) => {
	const instructure = await Instructure.findByIdAndUpdate(req.body);
	res.status(201).json(instructure);
});

app.delete('/instructure/:id', async (req, res) => {
	const instructure = await Instructure.findByIdAndDelete(req.body);
	res.status(201).json(instructure);
});

app.listen(2345, () => {
	connect();
	console.log('Listening on port 2345');
});
