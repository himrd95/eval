const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		roll_number: { type: Number, required: true },
		batch: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

const Students = mongoose.model('Student', userSchema);

module.exports = Students;
