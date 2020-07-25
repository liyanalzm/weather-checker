export const normalizeWeatherData = (data) => ({
  main: {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure
  },
  weather: {
    icon: data.weather[0].icon,
    description: data.weather[0].description
  },
  wind: {
    speed: data.wind.speed,
    degree: data.wind.deg
  },
  sunset: new Date(data.sys.sunset * 1000),
  sunrise: new Date(data.sys.sunrise * 1000),
  time: new Date(),
  visibility: data.visibility,
  cloudiness: data.clouds.all
});
