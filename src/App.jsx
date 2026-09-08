import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import { FireInfo } from './components/FireInfo';
import { Analytics } from './components/Analytics';
import { fetchWildfireEvents, exportWildfiresToCSV } from './services/nasaApi';
import { fetchFirmsHotspots } from './services/firmsApi';
import { fetchWeatherForLocation } from './services/weatherApi';
import { getNearbyCities } from './services/locationService';
import { Flame } from 'lucide-react';
import './App.css';

export function App() {
  // EONET State
  const [eonetEvents, setEonetEvents] = useState([]);
  const [loadingEonet, setLoadingEonet] = useState(true);
  const [isEonetMock, setIsEonetMock] = useState(false);
  const [eonetError, setEonetError] = useState(null);

  // FIRMS State
  const [firmsHotspots, setFirmsHotspots] = useState([]);
  const [loadingFirms, setLoadingFirms] = useState(true);
  const [isFirmsMock, setIsFirmsMock] = useState(false);
  const [firmsError, setFirmsError] = useState(null);

  // Selected Item, Map & Tab States
  const [selectedFire, setSelectedFire] = useState(null);
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'analytics'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  // Layer Visibility Controls
  const [showEonet, setShowEonet] = useState(true);
  const [showFirms, setShowFirms] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showWeather, setShowWeather] = useState(true);

  // WEATHER STATE
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // NEARBY CITIES STATE
  const [nearbyCities, setNearbyCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  // Load NASA EONET Data
  const loadEonetData = useCallback(async () => {
    setLoadingEonet(true);
    setEonetError(null);
    try {
      const data = await fetchWildfireEvents();
      setEonetEvents(data.events || []);
      setIsEonetMock(!!data.isMock);
    } catch (err) {
      console.error('Failed EONET fetch:', err);
      setEonetError(err.message);
    } finally {
      setLoadingEonet(false);
    }
  }, []);

  // Load NASA FIRMS Data
  const loadFirmsData = useCallback(async () => {
    setLoadingFirms(true);
    setFirmsError(null);
    try {
      const data = await fetchFirmsHotspots();
      setFirmsHotspots(data.hotspots || []);
      setIsFirmsMock(!!data.isMock);
    } catch (err) {
      console.error('Failed FIRMS fetch:', err);
      setFirmsError(err.message);
    } finally {
      setLoadingFirms(false);
    }
  }, []);

  // Combined Refresh
  const handleRefreshAll = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([loadEonetData(), loadFirmsData()]);
    setLastRefreshedAt(new Date().toISOString());
    setIsRefreshing(false);
  }, [loadEonetData, loadFirmsData]);

  // Initial Fetch on Mount
  useEffect(() => {
    handleRefreshAll();
  }, []);

  // 5-Minute Auto-Refresh Interval
  useEffect(() => {
    if (!autoRefreshEnabled) return;
    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const interval = setInterval(() => {
      console.log('Executing 5-minute telemetry refresh...');
      handleRefreshAll();
    }, FIVE_MINUTES_MS);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, handleRefreshAll]);

  // AUTOMATIC UPDATE: Weather & Nearby Cities when selectedFire changes
  useEffect(() => {
    if (!selectedFire || !selectedFire.latitude || !selectedFire.longitude) {
      setWeatherData(null);
      setNearbyCities([]);
      return;
    }

    const lat = selectedFire.latitude;
    const lng = selectedFire.longitude;

    // Fetch Weather
    setWeatherLoading(true);
    setWeatherError(null);
    fetchWeatherForLocation(lat, lng)
      .then((res) => {
        setWeatherData(res);
      })
      .catch((err) => {
        setWeatherError(err.message);
      })
      .finally(() => {
        setWeatherLoading(false);
      });

    // Calculate Nearby Cities
    setCitiesLoading(true);
    setCitiesError(null);
    getNearbyCities(lat, lng, 5)
      .then((cities) => {
        setNearbyCities(cities);
      })
      .catch((err) => {
        setCitiesError(err.message);
      })
      .finally(() => {
        setCitiesLoading(false);
      });
  }, [selectedFire]);

  // Filter EONET events
  const filteredEonetEvents = useMemo(() => {
    return eonetEvents.filter((fire) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query || 
        (fire.title && fire.title.toLowerCase().includes(query)) ||
        (fire.country && fire.country.toLowerCase().includes(query)) ||
        (fire.region && fire.region.toLowerCase().includes(query));

      const matchesSeverity = selectedSeverity === 'ALL' || fire.severity === selectedSeverity;
      const matchesRegion = selectedRegion === 'ALL' || fire.region === selectedRegion;

      return matchesSearch && matchesSeverity && matchesRegion;
    });
  }, [eonetEvents, searchTerm, selectedSeverity, selectedRegion]);

  // Filter FIRMS hotspots
  const filteredFirmsHotspots = useMemo(() => {
    return firmsHotspots.filter((spot) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = !query || 
        (spot.title && spot.title.toLowerCase().includes(query)) ||
        (spot.country && spot.country.toLowerCase().includes(query)) ||
        (spot.region && spot.region.toLowerCase().includes(query));

      const matchesSeverity = selectedSeverity === 'ALL' || spot.severity === selectedSeverity;
      const matchesRegion = selectedRegion === 'ALL' || spot.region === selectedRegion;

      return matchesSearch && matchesSeverity && matchesRegion;
    });
  }, [firmsHotspots, searchTerm, selectedSeverity, selectedRegion]);

  // Combined active list respecting layer visibility toggles
  const activeDisplayedList = useMemo(() => {
    const list = [];
    if (showEonet) list.push(...filteredEonetEvents);
    if (showFirms) list.push(...filteredFirmsHotspots);
    return list;
  }, [showEonet, showFirms, filteredEonetEvents, filteredFirmsHotspots]);

  // Extract unique regions list
  const regions = useMemo(() => {
    const all = [...eonetEvents, ...firmsHotspots];
    const set = new Set(all.map(w => w.region).filter(Boolean));
    return Array.from(set).sort();
  }, [eonetEvents, firmsHotspots]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSeverity('ALL');
    setSelectedRegion('ALL');
  };

  const handleExportCSV = () => {
    exportWildfiresToCSV(activeDisplayedList.length > 0 ? activeDisplayedList : [...eonetEvents, ...firmsHotspots]);
  };

  const highSeverityCount = useMemo(() => {
    const all = [...eonetEvents, ...firmsHotspots];
    return all.filter(w => w.severity === 'CRITICAL' || w.severity === 'HIGH').length;
  }, [eonetEvents, firmsHotspots]);

  const isLoading = loadingEonet && loadingFirms;

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        eonetCount={eonetEvents.length}
        firmsCount={firmsHotspots.length}
        highSeverityCount={highSeverityCount}
        isMock={isEonetMock || isFirmsMock}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={handleRefreshAll}
        isRefreshing={isRefreshing}
        onExportCSV={handleExportCSV}
        autoRefreshEnabled={autoRefreshEnabled}
        setAutoRefreshEnabled={setAutoRefreshEnabled}
        // Layer Toggles
        showEonet={showEonet}
        setShowEonet={setShowEonet}
        showFirms={showFirms}
        setShowFirms={setShowFirms}
        showHeatmap={showHeatmap}
        setShowHeatmap={setShowHeatmap}
        showWeather={showWeather}
        setShowWeather={setShowWeather}
      />

      {/* Main View Area */}
      <main className="main-content">
        {isLoading ? (
          <div className="full-screen-loader">
            <Flame className="spinner-icon" size={56} />
            <h2>Syncing NASA Telemetry Data Feeds...</h2>
            <p>Fetching EONET natural disaster events & FIRMS satellite thermal detections.</p>
          </div>
        ) : (
          <>
            {/* Sidebar View (Clean Navigation & Fire List Only) */}
            <Sidebar
              wildfires={activeDisplayedList}
              eonetEvents={eonetEvents}
              firmsHotspots={firmsHotspots}
              selectedFire={selectedFire}
              onSelectFire={(fire) => setSelectedFire(fire)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              regions={regions}
              onResetFilters={handleResetFilters}
              lastRefreshedAt={lastRefreshedAt}
            />

            {/* Dynamic View: Map or Analytics */}
            {activeTab === 'map' ? (
              <>
                <Map
                  eonetEvents={filteredEonetEvents}
                  firmsHotspots={filteredFirmsHotspots}
                  selectedFire={selectedFire}
                  onSelectFire={(fire) => setSelectedFire(fire)}
                  showEonet={showEonet}
                  showFirms={showFirms}
                  showHeatmap={showHeatmap}
                />

                {/* Right-Side Fire Details Panel (with Weather and Nearby Cities) */}
                {selectedFire && (
                  <FireInfo
                    wildfire={selectedFire}
                    onClose={() => setSelectedFire(null)}
                    onCenterOnMap={(fire) => setSelectedFire({ ...fire })}
                    showWeather={showWeather}
                    weatherData={weatherData}
                    weatherLoading={weatherLoading}
                    weatherError={weatherError}
                    nearbyCities={nearbyCities}
                    citiesLoading={citiesLoading}
                    citiesError={citiesError}
                  />
                )}
              </>
            ) : (
              <Analytics 
                eonetEvents={filteredEonetEvents} 
                firmsHotspots={filteredFirmsHotspots} 
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
