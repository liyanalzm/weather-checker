# The Weather Checker

The Weather Checker app allows you to check the current weather at any of your desired location! It can be a restaurant, hotel, city and landmarks. This app allows you to:

- Search your location
- Display weather information for that specific area
- The flexibility to use Metrics or Imperial units
- View in any device without any worries of the UI breaking

## Tech

The Weather Checker app uses a number of technologies such as:

- ReactJS
- Webpack
- Babel
- Sass - for making the UI looks a bit more pleasing
- Google Maps API (specifically the Places API)
- OpenWeatherMap API (specifically the Current Weather API)
- Netlify (to deploy the app)
- Github (for version control)

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd weather-checker
npm install
npm run start
```

You will need to add your `.env` file to allow the Google Maps API and OpenWeatherMap API to function. The `.env` file should follow:

```sh
GOOGLE_MAP_KEY=your_key
WEATHER_KEY=your_key
```

**Thank you!**
