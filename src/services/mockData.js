// Realistic fallback wildfire data modeled after NASA EONET API structure
export const MOCK_WILDFIRES = [
  {
    id: "EONET_6152",
    title: "Wildfire - Mosquito Fire, Placer County, California",
    description: "Active severe brush fire near Mosquito Road and Foresthill, California.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6152",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "InciWeb", url: "https://inciweb.nwcg.gov/incident/8398/" },
      { id: "CalFire", url: "https://www.fire.ca.gov/incidents" }
    ],
    geometry: [
      {
        magnitudeValue: 76788,
        magnitudeUnit: "ACRES",
        date: "2026-08-01T14:30:00Z",
        type: "Point",
        coordinates: [-120.7447, 39.0067]
      }
    ],
    country: "United States",
    region: "North America",
    severity: "CRITICAL"
  },
  {
    id: "EONET_6153",
    title: "Wildfire - Fairview Fire, Riverside County, California",
    description: "Rapidly spreading wildfire near Hemet, California.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6153",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "CalFire", url: "https://www.fire.ca.gov/incidents" }
    ],
    geometry: [
      {
        magnitudeValue: 28307,
        magnitudeUnit: "ACRES",
        date: "2026-08-02T10:15:00Z",
        type: "Point",
        coordinates: [-116.892, 33.7222]
      }
    ],
    country: "United States",
    region: "North America",
    severity: "HIGH"
  },
  {
    id: "EONET_6154",
    title: "Wildfire - Jasper National Park Complex, Alberta",
    description: "Wildfire complex in Canadian Rocky Mountain Parks ecosystem.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6154",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "ParksCanada", url: "https://parks.canada.ca/pn-np/ab/jasper/ne-wl/feu-fire" }
    ],
    geometry: [
      {
        magnitudeValue: 33000,
        magnitudeUnit: "HECTARES",
        date: "2026-08-03T08:00:00Z",
        type: "Point",
        coordinates: [-118.0814, 52.8737]
      }
    ],
    country: "Canada",
    region: "North America",
    severity: "CRITICAL"
  },
  {
    id: "EONET_6155",
    title: "Wildfire - Peloponnese Forest Fire, Greece",
    description: "Summer forest fire driven by heatwave conditions near Ancient Olympia region.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6155",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "EFFIS", url: "https://effis.jrc.ec.europa.eu/" }
    ],
    geometry: [
      {
        magnitudeValue: 12500,
        magnitudeUnit: "HECTARES",
        date: "2026-08-02T18:45:00Z",
        type: "Point",
        coordinates: [21.628, 37.643]
      }
    ],
    country: "Greece",
    region: "Europe",
    severity: "HIGH"
  },
  {
    id: "EONET_6156",
    title: "Wildfire - Gironde Pine Forest Fire, France",
    description: "Wildfire in Landes de Gascogne forest in Southwestern France.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6156",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "EFFIS", url: "https://effis.jrc.ec.europa.eu/" }
    ],
    geometry: [
      {
        magnitudeValue: 8400,
        magnitudeUnit: "HECTARES",
        date: "2026-08-01T11:20:00Z",
        type: "Point",
        coordinates: [-0.603, 44.437]
      }
    ],
    country: "France",
    region: "Europe",
    severity: "MEDIUM"
  },
  {
    id: "EONET_6157",
    title: "Wildfire - Pantanal Wetlands Fire, Mato Grosso, Brazil",
    description: "Dry season vegetation fire spreading across South American tropical wetland corridor.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6157",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "INPE", url: "http://queimadas.dcp.inpe.br/queimadas/bdqueimadas" }
    ],
    geometry: [
      {
        magnitudeValue: 45000,
        magnitudeUnit: "HECTARES",
        date: "2026-07-30T16:00:00Z",
        type: "Point",
        coordinates: [-56.626, -17.265]
      }
    ],
    country: "Brazil",
    region: "South America",
    severity: "CRITICAL"
  },
  {
    id: "EONET_6158",
    title: "Wildfire - Blue Mountains Bushfire, New South Wales, Australia",
    description: "Bushfire detected in eucalyptus forest region west of Sydney.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6158",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "NSWRFS", url: "https://www.rfs.nsw.gov.au/" }
    ],
    geometry: [
      {
        magnitudeValue: 9800,
        magnitudeUnit: "HECTARES",
        date: "2026-08-02T22:10:00Z",
        type: "Point",
        coordinates: [150.311, -33.713]
      }
    ],
    country: "Australia",
    region: "Oceania",
    severity: "MEDIUM"
  },
  {
    id: "EONET_6159",
    title: "Wildfire - Kruger Savannah Grassland Fire, South Africa",
    description: "Seasonal savanna wildfire moving across northeastern South Africa park boundary.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6159",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "AFIS", url: "https://afis.co.za/" }
    ],
    geometry: [
      {
        magnitudeValue: 6200,
        magnitudeUnit: "HECTARES",
        date: "2026-07-31T09:40:00Z",
        type: "Point",
        coordinates: [31.592, -23.988]
      }
    ],
    country: "South Africa",
    region: "Africa",
    severity: "LOW"
  },
  {
    id: "EONET_6160",
    title: "Wildfire - Siberian Boreal Forest Blaze, Sakha Republic, Russia",
    description: "Remote taiga forest fire in Northeastern Siberia.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6160",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "Avialesookhrana", url: "https://aviales.ru/" }
    ],
    geometry: [
      {
        magnitudeValue: 52000,
        magnitudeUnit: "HECTARES",
        date: "2026-07-29T12:00:00Z",
        type: "Point",
        coordinates: [129.732, 62.035]
      }
    ],
    country: "Russia",
    region: "Asia",
    severity: "CRITICAL"
  },
  {
    id: "EONET_6161",
    title: "Wildfire - Park Fire, Butte County, California",
    description: "Extremely fast-moving wildfire along Cohasset Road north of Chico.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6161",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "CalFire", url: "https://www.fire.ca.gov/incidents" }
    ],
    geometry: [
      {
        magnitudeValue: 429263,
        magnitudeUnit: "ACRES",
        date: "2026-08-03T19:00:00Z",
        type: "Point",
        coordinates: [-121.8375, 39.8519]
      }
    ],
    country: "United States",
    region: "North America",
    severity: "CRITICAL"
  },
  {
    id: "EONET_6162",
    title: "Wildfire - Oahu Brush Fire, Hawaii",
    description: "Wind-driven vegetation fire threatening central valley pastures.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6162",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "HFD", url: "https://www.honolulu.gov/hfd" }
    ],
    geometry: [
      {
        magnitudeValue: 1200,
        magnitudeUnit: "ACRES",
        date: "2026-08-02T15:30:00Z",
        type: "Point",
        coordinates: [-158.0001, 21.4389]
      }
    ],
    country: "United States",
    region: "North America",
    severity: "LOW"
  },
  {
    id: "EONET_6163",
    title: "Wildfire - Valparaíso Hillside Fire, Chile",
    description: "Forest fire along coastal hills causing evacuation warnings.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6163",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "CONAF", url: "https://www.conaf.cl/" }
    ],
    geometry: [
      {
        magnitudeValue: 14200,
        magnitudeUnit: "HECTARES",
        date: "2026-08-01T20:15:00Z",
        type: "Point",
        coordinates: [-71.612, -33.047]
      }
    ],
    country: "Chile",
    region: "South America",
    severity: "HIGH"
  },
  {
    id: "EONET_6164",
    title: "Wildfire - Mount Etna Slope Vegetation Fire, Sicily, Italy",
    description: "Vegetation fire near southern flanks of volcano.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6164",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "EFFIS", url: "https://effis.jrc.ec.europa.eu/" }
    ],
    geometry: [
      {
        magnitudeValue: 3100,
        magnitudeUnit: "HECTARES",
        date: "2026-08-03T11:00:00Z",
        type: "Point",
        coordinates: [15.004, 37.751]
      }
    ],
    country: "Italy",
    region: "Europe",
    severity: "MEDIUM"
  },
  {
    id: "EONET_6165",
    title: "Wildfire - Antalya Pine Forest Fire, Turkey",
    description: "Mediterranean coast wildfire fuelled by high humidity and temperatures.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6165",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "OGM", url: "https://www.ogm.gov.tr/" }
    ],
    geometry: [
      {
        magnitudeValue: 18500,
        magnitudeUnit: "HECTARES",
        date: "2026-07-31T17:40:00Z",
        type: "Point",
        coordinates: [30.713, 36.896]
      }
    ],
    country: "Turkey",
    region: "Europe",
    severity: "HIGH"
  },
  {
    id: "EONET_6166",
    title: "Wildfire - Western Australian Wheatbelt Fire, Australia",
    description: "Stubble and dry grass fire burning through agricultural pastures.",
    link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6166",
    categories: [{ id: "wildfires", title: "Wildfires" }],
    sources: [
      { id: "DFES", url: "https://www.dfes.wa.gov.au/" }
    ],
    geometry: [
      {
        magnitudeValue: 4800,
        magnitudeUnit: "HECTARES",
        date: "2026-08-01T04:20:00Z",
        type: "Point",
        coordinates: [116.858, -31.953]
      }
    ],
    country: "Australia",
    region: "Oceania",
    severity: "LOW"
  }
];
