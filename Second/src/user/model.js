const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		profile_photo_url: { type: String, required: true },
		roles: { type: Array, required: true, default: ['user'] },
	},
	{ versionKey: false, timestamps: true },
);

userSchema.pre('save', function (next) {
	if (!this.isModified('paassword')) return next;
	bcrypt(this.password, 9, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

userSchema.methods.checkPassword = function (password) {
	const hashPassword = this.password;
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hashPassword, (err, same) => {
			if (err) reject(err);
			if (password === hashPassword) {
				resolve(true);
			} else resolve(false);
		});
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
