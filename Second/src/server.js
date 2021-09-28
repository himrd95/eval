const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
const { register, login } = require('./user/controller');
const routerLecture = require('./lecture/controller');
const upload = require('./middleware/file-upload');
const routerStudents = require('./students/controller');

const connect = () => {
	mongoose.connect('mongodb://localhost:27017/authentication');
};

app.use(express.json());
app.post('/register', upload.single('avatar'), register);
app.post('/login', login);

app.use('/students', routerStudents);
app.use('/lectures', routerLecture);

app.listen(2345, () => {
	connect();
	console.log(`Listening on port ${2345}`);
});
