import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Interfaces for Type Safety
interface WeatherInfo {
  city: string;
  temp: number;
  description: string;
  icon: string;
}

// OpenWeatherMap API Response structure (Partial)
interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.render('index', { weather: null, error: null });
});

app.post('/weather', async (req: Request, res: Response) => {
  const city: string = req.body.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get<OpenWeatherResponse>(url);
    const weatherData = response.data;

    const weather: WeatherInfo = {
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
    };

    res.render('index', { weather, error: null });
  } catch (error) {
    res.render('index', { weather: null, error: "City not found, please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});