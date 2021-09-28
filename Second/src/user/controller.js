const { User } = require('./model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const newToken = (user) => {
	return jwt.sign({ user: user }, process.env.SECRET_KEY);
};

const User = async (req, res) => {
	const user = await User.findOne(req.body).lean().exec();
	console.log(user, !user);
	try {
		if (!user) {
			const token = newToken(user);
			await User.insertMany(req.body);
			return res.status(201).json({ token: token });
		} else {
			login(req, res);
		}
	} catch (err) {
		return res.status(500).json({
			status: 'failed',
			message: 'Something broken please try again later.',
		});
	}
};

const login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		}).exec();

		if (!user)
			return res.status(404).json({
				status: 'failed',
				message: 'You are not authorized.',
			});

		const match = await user.checkPassword(req.body.password);
		console.log('match', match, '42');
		if (!match)
			return res
				.status(404)
				.json({ status: 'failed', message: 'Wrong Credentials.' });
		const token = newToken(user);
		return res.status(200).json({ token: token });
	} catch (err) {
		res.status(500).json({ Error: 'Something has broken' });
	}
};

module.exports = { User, login };
