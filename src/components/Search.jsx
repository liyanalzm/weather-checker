import React, { useState, useEffect, useRef } from 'react';

import '../styles/components/search.scss';

const GOOGLE_MAP_KEY = process.env.GOOGLE_MAP_KEY;

let dropdown;

const Search = ({ onSelected }) => {
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Script is loaded on mounted to avoid long wait on the first load
    loadGPlaceScript(() => onGPlaceScriptLoaded(dropdownRef));
  }, []);

  const onGPlaceScriptLoaded = (dropdownRef) => {
    dropdown = new window.google.maps.places.Autocomplete(dropdownRef.current);
    dropdown.setFields([
      'geometry',
      'name',
      'formatted_address',
      'address_components',
      'types'
    ]);
    dropdown.addListener('place_changed', async () => {
      const placeDetails = await getPlaceDetails();
      setQuery(placeDetails.placeholderName);
      onSelected && onSelected(placeDetails);
    });
  };

  return (
    <div className="search">
      <input
        ref={dropdownRef}
        onChange={(event) => setQuery(event.target.value)}
        onClick={(event) => {
          event.target.select();
        }}
        placeholder="Enter any location"
        value={query}
      />
    </div>
  );
};

export default Search;

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

const getPlaceDetails = async () => {
  const placeObject = dropdown.getPlace();
  let name = placeObject.name;

  const isEstablishment = !!placeObject.types.find(
    (type) => type === 'establishment'
  );
  const isContinent = !!placeObject.types.find((type) => type == 'continent');

  console.log(placeObject);
  // Continent is declared as an Establishment
  if (isEstablishment && !isContinent) {
    const locality = placeObject.address_components.find((address) =>
      address.types.find((type) => type === 'locality')
    );

    const area = placeObject.address_components.find((address) =>
      address.types.find((type) => type === 'administrative_area_level_1')
    );
    if (locality || area) {
      name = `${locality ? `${locality.long_name}${area ? ', ' : ''}` : ''}${
        area ? area.long_name : ''
      }`;
    }
  }

  return {
    name,
    placeholderName: `${placeObject.name}, ${placeObject.formatted_address}`,
    lng: placeObject.geometry.location.lng(),
    lat: placeObject.geometry.location.lat()
  };
};
