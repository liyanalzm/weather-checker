import axios from 'axios';

const API_KEY = process.env.WEATHER_KEY;

export const getWeatherData = (lng, lat) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
    const data = axios.get(url);
    return data;
  } catch (error) {
    console.error('Error at Weather API', error);
    return null;
  }
};
