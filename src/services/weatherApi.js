import axios from 'axios';

/**
 * Maps WMO Weather Interpretation Codes to human readable conditions
 */
const mapWmoCodeToCondition = (code) => {
  if (code === 0) return 'Clear Sky';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code === 45 || code === 48) return 'Foggy / Hazy';
  if (code >= 51 && code <= 67) return 'Light Drizzle / Rain';
  if (code >= 71 && code <= 77) return 'Snow Flurry';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 95) return 'Thunderstorm Risk';
  return 'Dry / Sunny';
};

/**
 * Fallback weather estimation based on latitude/longitude heuristics
 */
const getFallbackWeather = (lat, lng) => {
  const absLat = Math.abs(lat);
  // High temp for dry Mediterranean/California/desert zones
  const baseTemp = absLat < 20 ? 32 : absLat < 40 ? 29 : absLat < 60 ? 22 : 14;
  const pseudoSeed = Math.abs(Math.sin(lat * 10 + lng * 5));
  
  const temp = Math.round(baseTemp + pseudoSeed * 6);
  const humidity = Math.max(12, Math.round(18 + pseudoSeed * 25));
  const windSpeed = Math.round(12 + pseudoSeed * 22);

  return {
    temperature: `${temp}°C`,
    humidity: `${humidity}%`,
    windSpeed: `${windSpeed} km/h`,
    condition: humidity < 25 ? 'Hot & Dry' : windSpeed > 25 ? 'High Wind Risk' : 'Clear Sky',
    isFallback: true
  };
};

/**
 * Fetches real-time weather information for selected wildfire coordinates
 * Uses Open-Meteo free API (No API key required)
 */
export const fetchWeatherForLocation = async (lat, lng) => {
  if (isNaN(lat) || isNaN(lng)) {
    return getFallbackWeather(39.0, -120.0);
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const response = await axios.get(url, { timeout: 6000 });

    if (response.data && response.data.current) {
      const current = response.data.current;
      const tempC = Math.round(current.temperature_2m);
      const humidity = Math.round(current.relative_humidity_2m);
      const windKmh = Math.round(current.wind_speed_10m);
      const condition = mapWmoCodeToCondition(current.weather_code);

      return {
        temperature: `${tempC}°C`,
        humidity: `${humidity}%`,
        windSpeed: `${windKmh} km/h`,
        condition: condition,
        rawTemp: tempC,
        rawHumidity: humidity,
        rawWind: windKmh,
        isFallback: false
      };
    }

    throw new Error('Invalid Open-Meteo response structure');
  } catch (error) {
    console.warn('Weather API fetch failed, using location fallback estimator:', error.message);
    return getFallbackWeather(lat, lng);
  }
};
