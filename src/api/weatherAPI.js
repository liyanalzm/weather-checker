import axios from 'axios';

const API_KEY = process.env.WEATHER_KEY;

export const getWeatherData = (lng, lat) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;
    // const url = 'https://run.mocky.io/v3/e6b95ad8-9605-426c-88f8-734f0eeb4536';
    const data = axios.get(url);
    return data;
  } catch (error) {
    console.error('Error at Weather API', error);
    return null;
  }
};
