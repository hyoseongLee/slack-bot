// features/weather/service.js
const axios = require('axios');
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

function getPm25Grade(pm2_5) {
  if (pm2_5 <= 15) return '좋음';
  if (pm2_5 <= 35) return '보통';
  if (pm2_5 <= 75) return '나쁨';
  return '매우나쁨';
}

async function getWeather(city = 'Seoul') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`;
  const res = await axios.get(url);
  const data = res.data;

  const { lat, lon } = data.coord;

  const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
  const airRes = await axios.get(airUrl);
  const airData = airRes.data;
  const pm2_5 = airData.list[0].components.pm2_5;

  return {
    city: data.name,
    description: data.weather[0].description,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
    pm2_5,
    pm2_5_grade: getPm25Grade(pm2_5),
  };
}

module.exports = { getWeather };
