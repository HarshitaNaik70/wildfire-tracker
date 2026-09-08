import axios from 'axios';
import { MOCK_WILDFIRES } from './mockData';

const EONET_URL = import.meta.env.VITE_NASA_EONET_API || 'https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires';

/**
 * Calculates fire severity based on magnitude value/unit or default heuristics.
 */

const calculateSeverity = (magnitudeValue, magnitudeUnit) => {
  if (!magnitudeValue) return 'MEDIUM';
  
  const val = Number(magnitudeValue);
  const unit = (magnitudeUnit || '').toUpperCase();

  if (unit.includes('ACRE')) {
    if (val > 50000) return 'CRITICAL';
    if (val > 10000) return 'HIGH';
    if (val > 2000) return 'MEDIUM';
    return 'LOW';
  }

  if (unit.includes('HECTARE')) {
    if (val > 20000) return 'CRITICAL';
    if (val > 5000) return 'HIGH';
    if (val > 1000) return 'MEDIUM';
    return 'LOW';
  }

  // Default value scaling
  if (val > 30000) return 'CRITICAL';
  if (val > 8000) return 'HIGH';
  if (val > 1000) return 'MEDIUM';
  return 'LOW';
};

/**
 * Derives country/region from title or coordinate ranges.
 */
const inferRegionAndCountry = (title, lng, lat) => {
  const t = (title || '').toLowerCase();
  
  if (t.includes('california') || t.includes('oregon') || t.includes('washington') || t.includes('texas') || t.includes('united states') || t.includes('usa')) {
    return { country: 'United States', region: 'North America' };
  }
  if (t.includes('canada') || t.includes('alberta') || t.includes('british columbia') || t.includes('ontario')) {
    return { country: 'Canada', region: 'North America' };
  }
  if (t.includes('greece') || t.includes('spain') || t.includes('italy') || t.includes('france') || t.includes('portugal') || t.includes('turkey')) {
    const country = t.includes('greece') ? 'Greece' : t.includes('spain') ? 'Spain' : t.includes('italy') ? 'Italy' : t.includes('france') ? 'France' : 'Turkey';
    return { country, region: 'Europe' };
  }
  if (t.includes('brazil') || t.includes('chile') || t.includes('argentina') || t.includes('amazon')) {
    const country = t.includes('brazil') ? 'Brazil' : t.includes('chile') ? 'Chile' : 'Argentina';
    return { country, region: 'South America' };
  }
  if (t.includes('australia') || t.includes('nsw') || t.includes('queensland') || t.includes('victoria')) {
    return { country: 'Australia', region: 'Oceania' };
  }
  if (t.includes('russia') || t.includes('siberia')) {
    return { country: 'Russia', region: 'Asia' };
  }

  // Geographic Bounding Boxes heuristic
  if (lat >= 14 && lat <= 75 && lng >= -170 && lng <= -50) {
    return { country: lat > 49 ? 'Canada' : 'United States', region: 'North America' };
  }
  if (lat >= -56 && lat <= 13 && lng >= -82 && lng <= -34) {
    return { country: lat < -20 ? 'Chile/Argentina' : 'Brazil', region: 'South America' };
  }
  if (lat >= 35 && lat <= 71 && lng >= -10 && lng <= 40) {
    return { country: 'European Union', region: 'Europe' };
  }
  if (lat >= -44 && lat <= -10 && lng >= 112 && lng <= 154) {
    return { country: 'Australia', region: 'Oceania' };
  }
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 51) {
    return { country: 'South Africa/Central Africa', region: 'Africa' };
  }

  return { country: 'International', region: 'Global' };
};

/**
 * Normalizes NASA EONET event raw item into standardized Wildfire object
 */
const normalizeEvent = (event) => {
  const geometries = event.geometry || [];
  if (!geometries.length) return null;

  // Take latest geometry record
  const latestGeom = geometries[geometries.length - 1];
  let lng = 0;
  let lat = 0;

  if (latestGeom.type === 'Point' && Array.isArray(latestGeom.coordinates)) {
    [lng, lat] = latestGeom.coordinates;
  } else if (latestGeom.type === 'Polygon' && Array.isArray(latestGeom.coordinates)) {
    // Calculate centroid of first ring
    const ring = latestGeom.coordinates[0] || [];
    if (ring.length) {
      const sum = ring.reduce((acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]], [0, 0]);
      lng = sum[0] / ring.length;
      lat = sum[1] / ring.length;
    }
  }

  // Validate coordinates
  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return null;
  }

  const { country, region } = inferRegionAndCountry(event.title, lng, lat);
  const severity = event.severity || calculateSeverity(latestGeom.magnitudeValue, latestGeom.magnitudeUnit);

  return {
    id: event.id,
    title: event.title || 'Active Wildfire Incident',
    description: event.description || `Wildfire detected near ${lat.toFixed(3)}°, ${lng.toFixed(3)}°.`,
    link: event.link || `https://eonet.gsfc.nasa.gov/api/v3/events/${event.id}`,
    sources: event.sources || [{ id: 'NASA EONET', url: 'https://eonet.gsfc.nasa.gov/' }],
    date: latestGeom.date || new Date().toISOString(),
    formattedDate: new Date(latestGeom.date || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    latitude: lat,
    longitude: lng,
    magnitudeValue: latestGeom.magnitudeValue || null,
    magnitudeUnit: latestGeom.magnitudeUnit || null,
    country,
    region,
    severity,
    rawGeometriesCount: geometries.length
  };
};

/**
 * Main API Fetcher with Axios & Fallback logic
 */
export const fetchWildfireEvents = async () => {
  try {
    const response = await axios.get(EONET_URL, {
      timeout: 10000,
      headers: { 'Accept': 'application/json' }
    });

    if (response.data && Array.isArray(response.data.events) && response.data.events.length > 0) {
      const parsedEvents = response.data.events
        .map(normalizeEvent)
        .filter(Boolean);

      if (parsedEvents.length > 0) {
        return {
          events: parsedEvents,
          isMock: false,
          fetchedAt: new Date().toISOString()
        };
      }
    }
    
    // Fallback to mock data if API returns zero events
    throw new Error('EONET API returned empty event list.');
  } catch (error) {
    console.warn('NASA EONET API Fetch Notice:', error.message, '- Using fallback dataset.');
    const mockNormalized = MOCK_WILDFIRES.map(normalizeEvent).filter(Boolean);
    return {
      events: mockNormalized,
      isMock: true,
      errorNotice: error.message,
      fetchedAt: new Date().toISOString()
    };
  }
};

/**
 * Utility to export wildfire data to CSV format
 */
export const exportWildfiresToCSV = (wildfires) => {
  if (!wildfires || !wildfires.length) return;

  const headers = ['ID', 'Title', 'Severity', 'Country', 'Region', 'Latitude', 'Longitude', 'Date', 'Source URL'];
  const rows = wildfires.map(w => [
    `"${w.id}"`,
    `"${(w.title || '').replace(/"/g, '""')}"`,
    `"${w.severity}"`,
    `"${w.country}"`,
    `"${w.region}"`,
    w.latitude,
    w.longitude,
    `"${w.formattedDate}"`,
    `"${w.link}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `wildfire_data_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
