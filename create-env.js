const fs = require('fs');
fs.writeFileSync(
  './.env',
  `GOOGLE_MAP_KEY=${process.env.GOOGLE_MAP_KEY}\WEATHER_KEY=${process.env.WEATHER_KEY}`
);
