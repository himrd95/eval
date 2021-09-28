const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.minetype === 'image/jpeg' ||
		file.minetype === 'image/png'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

module.exports = upload;
