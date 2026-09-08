/**
 * Database of major global cities with geographic coordinates
 */
const GLOBAL_CITIES_DB = [
  // North America
  { name: "Sacramento", country: "United States", lat: 38.5816, lng: -121.4944 },
  { name: "Stockton", country: "United States", lat: 37.9577, lng: -121.2908 },
  { name: "Modesto", country: "United States", lat: 37.6391, lng: -120.9969 },
  { name: "Chico", country: "United States", lat: 39.7285, lng: -121.8375 },
  { name: "Foresthill", country: "United States", lat: 39.0210, lng: -120.8322 },
  { name: "Reno", country: "United States", lat: 39.5296, lng: -119.8138 },
  { name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { name: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
  { name: "Hemet", country: "United States", lat: 33.7475, lng: -116.9720 },
  { name: "Palm Springs", country: "United States", lat: 33.8303, lng: -116.5453 },
  { name: "Portland", country: "United States", lat: 45.5152, lng: -122.6784 },
  { name: "Seattle", country: "United States", lat: 47.6062, lng: -122.3321 },
  { name: "Honolulu", country: "United States", lat: 21.3069, lng: -157.8583 },
  { name: "Jasper", country: "Canada", lat: 52.8737, lng: -118.0814 },
  { name: "Edmonton", country: "Canada", lat: 53.5461, lng: -113.4938 },
  { name: "Calgary", country: "Canada", lat: 51.0447, lng: -114.0719 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { name: "Kelowna", country: "Canada", lat: 49.8880, lng: -119.4960 },

  // Europe
  { name: "Olympia", country: "Greece", lat: 37.6384, lng: 21.6300 },
  { name: "Pyrgos", country: "Greece", lat: 37.6742, lng: 21.4397 },
  { name: "Patras", country: "Greece", lat: 38.2466, lng: 21.7345 },
  { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 },
  { name: "Bordeaux", country: "France", lat: 44.8378, lng: -0.5792 },
  { name: "Arcachon", country: "France", lat: 44.6586, lng: -1.1643 },
  { name: "Marseille", country: "France", lat: 43.2965, lng: 5.3698 },
  { name: "Catania", country: "Italy", lat: 37.5079, lng: 15.0830 },
  { name: "Palermo", country: "Italy", lat: 38.1157, lng: 13.3615 },
  { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { name: "Antalya", country: "Turkey", lat: 36.8969, lng: 30.7133 },
  { name: "Alanya", country: "Turkey", lat: 36.5438, lng: 31.9998 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { name: "Seville", country: "Spain", lat: 37.3891, lng: -5.9845 },

  // South America
  { name: "Corumbá", country: "Brazil", lat: -19.0064, lng: -57.6542 },
  { name: "Cuiabá", country: "Brazil", lat: -15.6010, lng: -56.0979 },
  { name: "Campo Grande", country: "Brazil", lat: -20.4697, lng: -54.6201 },
  { name: "Valparaíso", country: "Chile", lat: -33.0472, lng: -71.6127 },
  { name: "Viña del Mar", country: "Chile", lat: -33.0245, lng: -71.5518 },
  { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },

  // Oceania
  { name: "Katoomba", country: "Australia", lat: -33.7125, lng: 150.3119 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Wollongong", country: "Australia", lat: -34.4278, lng: 150.8931 },
  { name: "Northam", country: "Australia", lat: -31.6534, lng: 116.6661 },
  { name: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },

  // Asia & Russia
  { name: "Yakutsk", country: "Russia", lat: 62.0355, lng: 129.6755 },
  { name: "Pokrovsk", country: "Russia", lat: 61.4789, lng: 129.1412 },
  { name: "Irkutsk", country: "Russia", lat: 52.2870, lng: 104.2810 },

  // Africa
  { name: "Phalaborwa", country: "South Africa", lat: -23.9430, lng: 31.1411 },
  { name: "Nelspruit", country: "South Africa", lat: -25.4753, lng: 30.9694 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 }
];

/**
 * Calculates Great-Circle Haversine distance between two sets of coordinates in kilometers
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

/**
 * Finds top N nearby cities sorted by distance from target coordinates
 */
export const getNearbyCities = async (targetLat, targetLng, maxCities = 5) => {
  if (isNaN(targetLat) || isNaN(targetLng)) {
    return [];
  }

  // Calculate distance for all known cities
  const scored = GLOBAL_CITIES_DB.map((city) => {
    const distKm = calculateDistanceKm(targetLat, targetLng, city.lat, city.lng);
    return {
      name: city.name,
      country: city.country,
      distanceKm: distKm,
      formattedDistance: `${distKm} km`
    };
  });

  // Sort ascending by distance and return top `maxCities`
  scored.sort((a, b) => a.distanceKm - b.distanceKm);
  return scored.slice(0, maxCities);
};
