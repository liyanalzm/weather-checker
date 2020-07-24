const fs = require('fs');
fs.writeFileSync(
  './.env',
  `GOOGLE_MAP_KEY=${process.env.GOOGLE_MAP_KEY}\nWEATHER_KEY=${process.env.WEATHER_KEY}`
);
