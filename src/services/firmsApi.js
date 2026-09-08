import axios from 'axios';

const FIRMS_MAP_KEY = import.meta.env.VITE_FIRMS_MAP_KEY || '';

/**
 * Realistic Fallback FIRMS Thermal Hotspots Dataset
 */
export const MOCK_FIRMS_HOTSPOTS = [
  {
    id: "FIRMS_1001",
    title: "FIRMS Thermal Anomaly - Placer County, CA",
    description: "VIIRS S-NPP high-intensity thermal anomaly detected near Placer County forest boundary.",
    latitude: 39.1245,
    longitude: -120.6512,
    brightness: 372.4,
    confidence: "High (92%)",
    satellite: "VIIRS S-NPP",
    acquisitionDate: "2026-08-04T02:15:00Z",
    formattedDate: "Aug 4, 2026, 02:15 AM",
    country: "United States",
    region: "North America",
    severity: "CRITICAL",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1002",
    title: "FIRMS Hotspot - Riverside County, CA",
    description: "MODIS thermal hotspot cluster detected with elevated brightness temperature.",
    latitude: 33.6841,
    longitude: -116.7451,
    brightness: 351.8,
    confidence: "Nominal (78%)",
    satellite: "MODIS Aqua",
    acquisitionDate: "2026-08-04T01:30:00Z",
    formattedDate: "Aug 4, 2026, 01:30 AM",
    country: "United States",
    region: "North America",
    severity: "HIGH",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1003",
    title: "FIRMS Thermal Detection - Jasper National Park, AB",
    description: "VIIRS NOAA-20 active thermal signature detected over dense boreal timber area.",
    latitude: 52.9120,
    longitude: -118.1524,
    brightness: 368.1,
    confidence: "High (89%)",
    satellite: "VIIRS NOAA-20",
    acquisitionDate: "2026-08-04T03:00:00Z",
    formattedDate: "Aug 4, 2026, 03:00 AM",
    country: "Canada",
    region: "North America",
    severity: "CRITICAL",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1004",
    title: "FIRMS Hotspot - Peloponnese Region, Greece",
    description: "MODIS Terra thermal sensor active fire spot detection during Mediterranean heat event.",
    latitude: 37.7124,
    longitude: 21.7845,
    brightness: 348.5,
    confidence: "Nominal (82%)",
    satellite: "MODIS Terra",
    acquisitionDate: "2026-08-03T21:40:00Z",
    formattedDate: "Aug 3, 2026, 09:40 PM",
    country: "Greece",
    region: "Europe",
    severity: "HIGH",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1005",
    title: "FIRMS Thermal Anomaly - Pantanal Basin, Brazil",
    description: "High brightness temperature thermal hotspot detected over wetland vegetation cover.",
    latitude: -17.3412,
    longitude: -56.5123,
    brightness: 379.2,
    confidence: "High (95%)",
    satellite: "VIIRS S-NPP",
    acquisitionDate: "2026-08-04T00:10:00Z",
    formattedDate: "Aug 4, 2026, 12:10 AM",
    country: "Brazil",
    region: "South America",
    severity: "CRITICAL",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1006",
    title: "FIRMS Hotspot - Blue Mountains, NSW",
    description: "VIIRS NOAA-20 night pass active fire spot detected near mountain ridge.",
    latitude: -33.6421,
    longitude: 150.2841,
    brightness: 342.1,
    confidence: "Nominal (74%)",
    satellite: "VIIRS NOAA-20",
    acquisitionDate: "2026-08-03T18:25:00Z",
    formattedDate: "Aug 3, 2026, 06:25 PM",
    country: "Australia",
    region: "Oceania",
    severity: "MEDIUM",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1007",
    title: "FIRMS Hotspot - Sakha Boreal Forest, Russia",
    description: "Extreme brightness temperature thermal anomaly in remote Siberian taiga zone.",
    latitude: 62.1524,
    longitude: 129.8412,
    brightness: 384.6,
    confidence: "High (98%)",
    satellite: "VIIRS S-NPP",
    acquisitionDate: "2026-08-03T14:00:00Z",
    formattedDate: "Aug 3, 2026, 02:00 PM",
    country: "Russia",
    region: "Asia",
    severity: "CRITICAL",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1008",
    title: "FIRMS Hotspot - Butte County, CA",
    description: "Park Fire active thermal perimeter hotspot cluster.",
    latitude: 39.8912,
    longitude: -121.7845,
    brightness: 388.9,
    confidence: "High (99%)",
    satellite: "VIIRS S-NPP",
    acquisitionDate: "2026-08-04T03:30:00Z",
    formattedDate: "Aug 4, 2026, 03:30 AM",
    country: "United States",
    region: "North America",
    severity: "CRITICAL",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1009",
    title: "FIRMS Hotspot - Gironde Forest, France",
    description: "MODIS sensor detection over Southwestern pine forest corridor.",
    latitude: 44.5123,
    longitude: -0.5412,
    brightness: 339.4,
    confidence: "Nominal (68%)",
    satellite: "MODIS Aqua",
    acquisitionDate: "2026-08-03T16:15:00Z",
    formattedDate: "Aug 3, 2026, 04:15 PM",
    country: "France",
    region: "Europe",
    severity: "MEDIUM",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1010",
    title: "FIRMS Hotspot - Valparaíso Coast, Chile",
    description: "Coastal hillside brush vegetation thermal anomaly.",
    latitude: -33.1124,
    longitude: -71.5841,
    brightness: 356.2,
    confidence: "High (86%)",
    satellite: "VIIRS NOAA-20",
    acquisitionDate: "2026-08-03T23:05:00Z",
    formattedDate: "Aug 3, 2026, 11:05 PM",
    country: "Chile",
    region: "South America",
    severity: "HIGH",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1011",
    title: "FIRMS Hotspot - Sicily Slopes, Italy",
    description: "Volcanic flank vegetation active fire thermal pixel.",
    latitude: 37.8124,
    longitude: 15.0841,
    brightness: 341.0,
    confidence: "Nominal (71%)",
    satellite: "MODIS Terra",
    acquisitionDate: "2026-08-04T02:00:00Z",
    formattedDate: "Aug 4, 2026, 02:00 AM",
    country: "Italy",
    region: "Europe",
    severity: "MEDIUM",
    type: "FIRMS"
  },
  {
    id: "FIRMS_1012",
    title: "FIRMS Hotspot - Antalya Coast, Turkey",
    description: "Mediterranean forest canopy high thermal detection.",
    latitude: 36.9412,
    longitude: 30.7841,
    brightness: 362.7,
    confidence: "High (88%)",
    satellite: "VIIRS S-NPP",
    acquisitionDate: "2026-08-03T20:50:00Z",
    formattedDate: "Aug 3, 2026, 08:50 PM",
    country: "Turkey",
    region: "Europe",
    severity: "HIGH",
    type: "FIRMS"
  }
];

/**
 * Derives country/region from title or coordinate ranges.
 */
const inferLocation = (lat, lng) => {
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
    return { country: 'Africa Region', region: 'Africa' };
  }
  return { country: 'International', region: 'Asia/Global' };
};

/**
 * Parse CSV line from FIRMS API response
 */
const parseFirmsCsv = (csvText) => {
  const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const latIdx = headers.indexOf('latitude');
  const lngIdx = headers.indexOf('longitude');
  const brightIdx = headers.indexOf('brightness') !== -1 ? headers.indexOf('brightness') : headers.indexOf('bright_ti4');
  const dateIdx = headers.indexOf('acq_date');
  const timeIdx = headers.indexOf('acq_time');
  const satIdx = headers.indexOf('satellite') !== -1 ? headers.indexOf('satellite') : headers.indexOf('instrument');
  const confIdx = headers.indexOf('confidence');

  return lines.slice(1).map((line, index) => {
    const parts = line.split(',');
    const lat = parseFloat(parts[latIdx]);
    const lng = parseFloat(parts[lngIdx]);
    if (isNaN(lat) || isNaN(lng)) return null;

    const brightness = brightIdx !== -1 ? parseFloat(parts[brightIdx]) : 340;
    const acqDate = dateIdx !== -1 ? parts[dateIdx] : new Date().toISOString().slice(0, 10);
    const acqTime = timeIdx !== -1 ? parts[timeIdx] : '0000';
    const satellite = satIdx !== -1 ? parts[satIdx] : 'VIIRS';
    const confidence = confIdx !== -1 ? parts[confIdx] : 'Nominal';

    const { country, region } = inferLocation(lat, lng);
    const severity = brightness > 375 ? 'CRITICAL' : brightness > 350 ? 'HIGH' : brightness > 330 ? 'MEDIUM' : 'LOW';

    return {
      id: `FIRMS_${index}_${lat.toFixed(2)}_${lng.toFixed(2)}`,
      title: `FIRMS Hotspot - ${satellite} Thermal Detection`,
      description: `Active satellite thermal detection (${satellite}) with ${confidence} confidence. Brightness Temp: ${brightness}K.`,
      latitude: lat,
      longitude: lng,
      brightness,
      confidence: `${confidence}`,
      satellite: `${satellite}`,
      acquisitionDate: `${acqDate}T${acqTime.slice(0,2)}:${acqTime.slice(2,4) || '00'}:00Z`,
      formattedDate: `${acqDate} (${acqTime} UTC)`,
      country,
      region,
      severity,
      type: 'FIRMS'
    };
  }).filter(Boolean);
};

/**
 * Main FIRMS Fetcher Function
 */
export const fetchFirmsHotspots = async () => {
  if (!FIRMS_MAP_KEY) {
    console.info('NASA FIRMS MAP KEY not set in .env. Using realistic FIRMS fallback dataset.');
    return {
      hotspots: MOCK_FIRMS_HOTSPOTS,
      isMock: true,
      fetchedAt: new Date().toISOString()
    };
  }

  try {
    // NASA FIRMS VIIRS S-NPP NRT 24h Area query (World bounding box or USA country query)
    const url = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/USA/1`;
    const response = await axios.get(url, { timeout: 10000 });

    if (response.data && typeof response.data === 'string') {
      const parsed = parseFirmsCsv(response.data);
      if (parsed.length > 0) {
        return {
          hotspots: parsed,
          isMock: false,
          fetchedAt: new Date().toISOString()
        };
      }
    }
    throw new Error('FIRMS API response yielded no parsed records.');
  } catch (err) {
    console.warn('FIRMS API Fetch Warning:', err.message, '- Using fallback FIRMS dataset.');
    return {
      hotspots: MOCK_FIRMS_HOTSPOTS,
      isMock: true,
      errorNotice: err.message,
      fetchedAt: new Date().toISOString()
    };
  }
};
