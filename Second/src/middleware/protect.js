const jwt = require('jsonwebtoken');
const { Register } = require('../user/model');

const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
			if (err) return reject(err);
			return resolve(payload);
		});
	});
};

const protect = async (req, res, next) => {
	try {
		const bearer = req.headers.authorization;
		if (!bearer || !bearer.startsWith === 'Bearer') {
			return res.status(404).json({
				status: 'failed',
				message: 'Token is not valid',
			});
		}
		const token = bearer.split(' ')[1];
		const verified = await verifyToken(token);
		// console.log(verified.user._id, 'protect');
		if (!verified)
			return res.status(404).json({
				status: 'failed',
				message: 'Email or password is not correct',
			});
		const user = await Register.findById(verified.user._id).exec();
		req.user = user;
		next();
	} catch (e) {
		return res.status(404).json({
			status: 'failed',
			message: 'Something Went wrong',
		});
	}
};

module.exports = protect;
