import React from 'react';

import '../../styles/components/Weather/WeatherDisplay.scss';
import { capitalizeFirstLetter } from '../../helpers/string';
import { formatDateTime, formatTime } from '../../helpers/date';

const WeatherDisplay = ({ data, location }) => {
  console.log(data);
  const {
    weather,
    main,
    sunset,
    sunrise,
    time,
    wind,
    visibility,
    cloudiness
  } = data;
  return (
    <div className="weather-display">
      <div>
        <h2 className="title">Current weather report for {location.name}</h2>
        <sub className="datetime">{formatDateTime(time)}</sub>
      </div>
      <div className="temperature">
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <h2>{main.temp} °C</h2>
      </div>
      <p className="summary">
        {main.feelsLike && `Feels like ${main.feelsLike} °C.`}
        {weather.description &&
          ` ${capitalizeFirstLetter(weather.description)}.`}
      </p>
      <div className="info">
        <div className="info__item">
          <label>Humidity</label>
          <span>{main.humidity}%</span>
        </div>
        <div className="info__item">
          <label>Pressure</label>
          <span>{main.pressure} hPa</span>
        </div>
        <div className="info__item">
          <label>Wind Speed</label>
          <span>{wind.speed} m/s</span>
        </div>
        <div className="info__item">
          <label>Wind Degrees</label>
          <span>{wind.degree} degrees (meteorological)</span>
        </div>
        <div className="info__item">
          <label>Visibility</label>
          <span>{visibility} metres</span>
        </div>
        <div className="info__item">
          <label>Cloudiness</label>
          <span>{cloudiness}%</span>
        </div>
        <div className="info__item">
          <label>Sunsrise</label>
          <span>{formatTime(sunrise)}</span>
        </div>
        <div className="info__item">
          <label>Sunset</label>
          <span>{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
