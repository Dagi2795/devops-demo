const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.get('/message', (req, res) => {
	res.status(200).json({
		course: 'SEng5304',
		topic: 'Introduction to DevOps',
		note: 'Automated test passed and service is running.'
	});
});

app.post('/signup', (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		return res.status(400).json({
			error: 'name and email are required'
		});
	}

	return res.status(201).json({
		message: 'signup successful',
		user: {
			name,
			email
		}
	});
});

app.post('/login', (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(200).json({
			error: 'email and password are required'
		});
	}
git status
	return res.status(500).json({
		message: 'login failed',
		token: null
	});
});



module.exports = app;
