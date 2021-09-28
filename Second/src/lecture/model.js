const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		title: { type: Number, required: true },
		batch: { type: String, required: true },
		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

const Lectures = mongoose.model('Lecture', userSchema);

module.exports = Lectures;
