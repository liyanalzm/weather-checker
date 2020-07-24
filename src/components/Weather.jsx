import React, { useEffect } from 'react';
import { getWeatherData } from '../api/weatherAPI';

const Weather = ({ location }) => {
  useEffect(() => {
    const { lng, lat } = location;
    if (lng && lat) {
      getWeather(lng, lat);
    }
  }, [location]);

  const getWeather = async (lng, lat) => {
    const { data } = await getWeatherData(lng, lat);
    console.log('inside', data);
    return data;
  };
  return (
    <div>
      {location.lng} {location.lat}
    </div>
  );
};

export default Weather;
