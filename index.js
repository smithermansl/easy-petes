'use strict';
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const axios = require('axios');

app.use(express.json());
app.get('/api/projects', async (req, res, next) => {

	const opts = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Accept-Version': '1.0.0',
			'Authorization': `Bearer ${process.env.AUTH}`
        }
    };

	try {
        const { data } = await axios.get(`https://api.webflow.com/collections/${process.env.COLLECTION_ID}/items`, opts);

		res.status(200)
			.set({ 'Access-Control-Allow-Origin': '*' })
			.json(data);
	} catch(err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
