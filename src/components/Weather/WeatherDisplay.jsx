import React from 'react';

import '../../styles/components/Weather/WeatherDisplay.scss';
import { capitalizeFirstLetter } from '../../helpers/string';
import { formatDateTime, formatTime } from '../../helpers/date';

const WeatherDisplay = ({ data, location }) => {
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
      <MoreInfo
        infos={[
          { label: 'Humidity', value: `${main.humidity}%` },
          { label: 'Pressure', value: `${main.pressure} hPa` },
          { label: 'Wind Speed', value: `${wind.speed} m/s` },
          {
            label: 'Wind Degrees',
            value: `${wind.degree} degrees (meteorological)`
          },
          { label: 'Visibility', value: `${visibility} metres` },
          { label: 'Cloudiness', value: `${cloudiness}%` },
          { label: 'Sunsrise', value: formatTime(sunrise) },
          { label: 'Sunset', value: formatTime(sunset) }
        ]}
      />
    </div>
  );
};

export default WeatherDisplay;

const MoreInfo = ({ infos }) => (
  <div className="info">
    {infos.map(({ label, value }) => (
      <div className="info__item">
        <label>{label}</label>
        <span>{value}</span>
      </div>
    ))}
  </div>
);
