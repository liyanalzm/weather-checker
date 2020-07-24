import React, { useState, useEffect, useRef } from 'react';

import '../styles/components/search.scss';

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;

let dropdown;

const loadGPlaceScript = (callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&libraries=places`;
  document.getElementsByTagName('head')[0].appendChild(script); // append to head
};

const getPlaceLngLat = () => {
  const placeObject = dropdown.getPlace();
  return {
    lng: placeObject.geometry.location.lng(),
    lat: placeObject.geometry.location.lat()
  };
};

const Search = ({ onSelected }) => {
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Script is loaded on mounted to avoid long wait on the first load
    loadGPlaceScript(() => onGPlaceScriptLoaded(dropdownRef));
  }, []);

  const onGPlaceScriptLoaded = (dropdownRef) => {
    dropdown = new window.google.maps.places.Autocomplete(dropdownRef.current);
    dropdown.setFields(['geometry']);
    dropdown.addListener('place_changed', async () => {
      const placeLngLat = await getPlaceLngLat();
      onSelected && onSelected(placeLngLat);
    });
  };

  return (
    <div className="search">
      <input
        ref={dropdownRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter any location"
        value={query}
      />
    </div>
  );
};

export default Search;
