use serde::Deserialize;
use reqwest::Client;

#[derive(Deserialize, Debug)]
pub struct WeatherData {
    pub main: Main,
    pub wind: Wind,
    pub weather: Vec<WeatherDescription>,
}

#[derive(Deserialize, Debug)]
pub struct Main {
    pub temp: f32,
    pub humidity: f32,
}

#[derive(Deserialize, Debug)]
pub struct Wind {
    pub speed: f32, // Important for Drone Safety
}

#[derive(Deserialize, Debug)]
pub struct WeatherDescription {
    pub description: String,
}

pub struct WeatherService {
    api_key: String,
    client: Client,
}

impl WeatherService {
    pub fn new(api_key: String) -> Self {
        Self {
            api_key,
            client: Client::new(),
        }
    }

    pub async fn get_current_weather(&self, lat: f64, lon: f64) -> Result<WeatherData, reqwest::Error> {
        let url = format!(
            "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric",
            lat, lon, self.api_key
        );

        let response = self.client.get(url).send().await?.json::<WeatherData>().await?;
        Ok(response)
    }
}