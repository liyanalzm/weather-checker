import React, { useEffect, useState } from 'react';
import WeatherDisplay from './WeatherDisplay.jsx';

import { getWeatherData } from '../../api/weatherAPI';

import '../../styles/components/Weather/index.scss';
import { normalizeWeatherData } from '../../models/weatherModel.js';
import Toggle from '../Common/Toggle.jsx';

const Weather = ({ location }) => {
  const [weatherData, setWeatherData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    const { lng, lat } = location;
    if (lng && lat) {
      getWeather(lng, lat);
    }
  }, [location]);

  const getWeather = async (lng, lat) => {
    setIsFetching(true);
    const { data } = await getWeatherData(lng, lat, isMetric);
    const normalizedData = normalizeWeatherData(data);
    setWeatherData(normalizedData);
    document
      .getElementById('weather')
      .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    setIsFetching(false);
  };

  useEffect(() => {
    // refetch data after unit change
    const { lng, lat } = location;
    getWeather(lng, lat);
  }, [isMetric]);

  return (
    <div className="weather" id="weather">
      {!isFetching ? (
        <>
          {weatherData ? (
            <>
              <div className="toggle-container">
                <Toggle
                  options={[
                    {
                      id: 'metrics',
                      label: 'Metric: °C, m/s',
                      isChecked: isMetric,
                      onClick: () => setIsMetric(true)
                    },
                    {
                      id: 'imperial',
                      label: 'Imperial: °F, mph',
                      isChecked: !isMetric,
                      onClick: () => setIsMetric(false)
                    }
                  ]}
                />
              </div>
              <WeatherDisplay
                data={weatherData}
                location={location}
                isMetric={isMetric}
              />
            </>
          ) : (
            <div className="text-container">Failed to fetch weather data</div>
          )}
        </>
      ) : (
        <div className="text-container">Loading...</div>
      )}
    </div>
  );
};

export default Weather;
