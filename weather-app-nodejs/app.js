require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

// Routes
app.get('/', (req, res) => {
	res.render('index', { weather: null, error: null});
});

app.post('/weather', async (req, res) => {
	const city =  req.body.city;
	const apiKey = process.env.WEATHER_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	try {
		const response = await axios.get(url);
		const weatherData = response.data;

		const weather = {
			city: weatherData.name,
			temp: weatherData.main.temp,
			description: weatherData.weather[0].description,
			icon: weatherData.weather[0].icon
		};

		res.render('index', { weather, error: null });
	} catch (error) {
		res.render('index', {weather: null, error: "City not found, please try again."});
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});