import React, { useEffect, useState } from 'react';
import WeatherDisplay from './WeatherDisplay.jsx';

import { getWeatherData } from '../../api/weatherAPI';

import '../../styles/components/Weather/index.scss';
import { normalizeWeatherData } from '../../models/weatherModel.js';

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const { lng, lat } = location;
    if (lng && lat) {
      getWeather(lng, lat);
    }
  }, [location]);

  const getWeather = async (lng, lat) => {
    setIsFetching(true);
    const { data } = await getWeatherData(lng, lat);
    const normalizedData = normalizeWeatherData(data);
    setWeatherData(normalizedData);
    console.log(document.getElementById('weather'));
    document
      .getElementById('weather')
      .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    setIsFetching(false);
  };
  return (
    <div className="weather" id="weather">
      {!isFetching ? (
        <>
          {weatherData ? (
            <WeatherDisplay data={weatherData} location={location} />
          ) : (
            'Failed to fetch weather data'
          )}
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Weather;
