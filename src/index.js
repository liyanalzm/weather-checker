import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import './styles/index.scss';
import Search from './components/Search.jsx';
import Weather from './components/Weather/index.jsx';

const App = () => {
  // const [location, setLocation] = useState({
  //   name: 'Pisa, Italy',
  //   lat: 0,
  //   lng: 0
  // });
  const [location, setLocation] = useState();
  return (
    <div className="container">
      <div className="welcome-text">
        <h1>The Weather Checker</h1>
        <p>Check the current weather for your desired location</p>
      </div>
      <Search onSelected={(selectedLngLat) => setLocation(selectedLngLat)} />
      {location && <Weather location={location} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
