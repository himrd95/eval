const authorization = (permittedRoles) => async (req, res, next) => {
	try {
		const user = req.user;
		const roles = user.roles;
		const permitted = permittedRoles.find((role) =>
			roles.includes(role),
		);
		if (!permitted)
			res
				.status(403)
				.json({ status: 'failed', message: 'access denied!' });
		else next();
	} catch (e) {
		res.status(500).json({
			status: 'failed',
			message: 'Something has been broken!',
		});
	}
};

module.exports = authorization;
