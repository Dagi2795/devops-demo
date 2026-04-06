const express = require('express');

const app = express();

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

module.exports = app;
