# 🔥 Wildfire Tracker - NASA EONET Live Monitoring Platform

A production-ready, interactive web application built with **React**, **Vite**, **Google Maps JavaScript API**, **Leaflet (OpenStreetMap fallback)**, **NASA EONET API**, and **Chart.js**.

![Wildfire Tracker Banner](https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- **📡 Live NASA EONET API Integration**: Real-time satellite data fetching from NASA Earth Observatory Natural Event Tracker (EONET v3).
- **🗺️ Dual-Engine Interactive Mapping**:
  - Full Google Maps JS API support with custom dark theme styling.
  - Automatic Leaflet / OpenStreetMap fallback if Google Maps API key is omitted or invalid.
  - Heatmap intensity layer visualization.
  - Custom SVG fire markers with severity pulse animations.
- **📊 Real-time Analytics Dashboard**:
  - Region-wise wildfire distribution (Bar Chart).
  - Fire severity threat breakdown (Doughnut Chart).
  - Recent wildfire activity timeline trends (Line Chart).
  - Leaderboard ranking of top affected nations.
- **🔍 Instant Search & Multi-level Filtering**:
  - Real-time text search by fire name, country, or coordinates.
  - Severity level filter chips (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
  - Region dropdown selector.
- **🔄 Auto-Refresh Engine**: Configurable 5-minute background sync timer with toggle.
- **📥 CSV Data Exporter**: Export active wildfire datasets directly to CSV format.
- **💎 Dark Glassmorphic UI/UX**: Premium dark theme UI inspired by NASA Earth observation tools and modern SaaS dashboards.

---

## 📁 Project Architecture & Folder Structure

```
wildfire-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Header navigation bar, view toggles, CSV export & sync controls
│   │   ├── Map.jsx             # Interactive map container with Google Maps & Leaflet fallback
│   │   ├── FireMarker.jsx      # Dynamic SVG wildfire markers with pulse animations
│   │   ├── Sidebar.jsx         # Collapsible dashboard panel with stats, search & wildfire list
│   │   ├── FireInfo.jsx        # Glassmorphic modal detailing selected wildfire specs & sources
│   │   ├── SearchBar.jsx       # Real-time search bar & filter chips
│   │   └── Analytics.jsx       # Chart.js analytics dashboard
│   ├── services/
│   │   ├── nasaApi.js          # NASA EONET API client, normalizer, severity classifier & CSV exporter
│   │   └── mockData.js         # Curated realistic fallback wildfire dataset
│   ├── App.jsx                 # Core application state manager
│   ├── App.css                 # Global CSS design system, dark tokens, glassmorphism
│   └── main.jsx                # React root entry point
├── .env                        # Environment variable configuration
├── .env.example                # Template for environment variables
├── package.json                # Project dependencies
├── vite.config.js              # Vite bundler config
└── README.md                   # Documentation
```

---

## ⚡ Component Breakdown

| Component | Description |
| :--- | :--- |
| **`Header.jsx`** | Displays branding, live counters, auto-refresh toggle, CSV exporter, and map/analytics view switcher. |
| **`Map.jsx`** | Supports Google Maps API & Leaflet OpenStreetMap. Handles custom markers, heatmaps, camera fly-to animations, and popup popovers. |
| **`FireMarker.jsx`** | Generates SVG markers with dynamic severity color rules and ripple pulse keyframe animations. |
| **`Sidebar.jsx`** | Collapsible panel rendering quick KPI metric cards, search bar, severity chips, and a scrollable fire incident list. |
| **`FireInfo.jsx`** | Glassmorphic popup card providing full fire details, reporting agencies, magnitude metrics, and copy-coordinates utility. |
| **`SearchBar.jsx`** | Real-time input search for case-insensitive filtering across fire titles, countries, and coordinates. |
| **`Analytics.jsx`** | Integrates Chart.js visualizations for regional distribution, severity breakdown, trend timelines, and national leaderboard tables. |
| **`nasaApi.js`** | Axios-powered EONET consumer. Parses POINT/POLYGON geometry, computes severity, and provides mock data resilience. |

---

## 🛠️ Environment Setup

Create a `.env` file in the root directory:

```env
# NASA EONET Wildfires API
VITE_NASA_EONET_API=https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires

# Optional: Google Maps JavaScript API Key
# If omitted or invalid, the app automatically switches to OpenStreetMap (Leaflet)
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

---

## 🚀 Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/wildfire-tracker.git
   cd wildfire-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --build
```

---

## 📝 Tech Stack Details

- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS3 (Custom Properties, Glassmorphism, Flexbox/Grid)
- **Data Source**: NASA EONET v3 API (`axios`)
- **Maps**: `@react-google-maps/api`, `leaflet`, `react-leaflet`
- **Charts**: `chart.js`, `react-chartjs-2`
- **Icons**: `lucide-react`, `@mui/icons-material`

---

## 📄 License
MIT License. Created for portfolio and software engineering interview showcase.
