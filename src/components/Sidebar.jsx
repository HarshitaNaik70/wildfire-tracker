import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  FlameKindling, 
  Clock, 
  MapPin, 
  ListFilter,
  Radio,
  Sliders,
  Sparkles
} from 'lucide-react';
import { getSeverityColor } from './FireMarker';

export const Sidebar = ({ 
  wildfires, 
  eonetEvents = [],
  firmsHotspots = [],
  selectedFire, 
  onSelectFire,
  searchTerm,
  setSearchTerm,
  selectedSeverity,
  setSelectedSeverity,
  selectedRegion,
  setSelectedRegion,
  regions,
  onResetFilters,
  lastRefreshedAt
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Compute Required Metrics
  const totalEonet = eonetEvents.length;
  const totalFirms = firmsHotspots.length;
  const countDifference = Math.abs(totalEonet - totalFirms);
  
  // Latest FIRMS Detection calculation
  const latestFirms = firmsHotspots.length > 0 ? firmsHotspots[0] : null;

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Collapse Toggle Button */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand Dashboard Panel" : "Collapse Panel"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {!isCollapsed && (
        <div className="sidebar-content">
          {/* Detailed Metric Cards Grid */}
          <div className="sidebar-stats-grid firms-stats-grid">
            <div className="stat-card">
              <div className="stat-card-icon red">
                <FlameKindling size={18} />
              </div>
              <div className="stat-card-data">
                <span className="stat-number">{totalEonet}</span>
                <span className="stat-name">EONET Events</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon orange">
                <Radio size={18} />
              </div>
              <div className="stat-card-data">
                <span className="stat-number">{totalFirms}</span>
                <span className="stat-name">FIRMS Hotspots</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-icon purple">
                <Sliders size={18} />
              </div>
              <div className="stat-card-data">
                <span className="stat-number">{countDifference}</span>
                <span className="stat-name">Delta |E-F|</span>
              </div>
            </div>
          </div>

          {/* Latest FIRMS Detection Banner */}
          {!selectedFire && latestFirms && (
            <div className="latest-firms-banner" onClick={() => onSelectFire(latestFirms)} title="Click to view latest satellite hotspot">
              <div className="banner-badge"><Sparkles size={12} /> Latest FIRMS Detection</div>
              <div className="banner-title">📡 {latestFirms.title}</div>
              <div className="banner-meta">
                <span>📍 {latestFirms.country}</span>
                <span>🕒 {latestFirms.formattedDate}</span>
              </div>
            </div>
          )}

          {/* Search & Filter Section */}
          <div className="sidebar-section search-section">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              regions={regions}
              onResetFilters={onResetFilters}
            />
          </div>

          {/* Wildfire Event List Header */}
          <div className="list-header">
            <div className="list-title">
              <ListFilter size={16} />
              <span>Active Telemetry List ({wildfires.length})</span>
            </div>
            {lastRefreshedAt && (
              <span className="last-sync-time" title="Last Telemetry Sync">
                <Clock size={12} /> {new Date(lastRefreshedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* Scrollable Event Cards List */}
          <div className="wildfire-list-scroll">
            {wildfires.length === 0 ? (
              <div className="empty-state">
                <Flame size={40} className="empty-icon" />
                <h4>No Incidents Found</h4>
                <p>No active telemetry records match your search or active layer toggles.</p>
                <button className="reset-btn" onClick={onResetFilters}>
                  Clear Search Filters
                </button>
              </div>
            ) : (
              wildfires.map((fire) => {
                const isSelected = selectedFire && selectedFire.id === fire.id;
                const isFirms = fire.type === 'FIRMS';
                const colors = getSeverityColor(fire.severity, fire.type);

                return (
                  <div 
                    key={fire.id}
                    className={`wildfire-card ${isFirms ? 'firms-card' : 'eonet-card'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectFire(fire)}
                    style={{ borderLeftColor: colors.fill }}
                  >
                    <div className="card-top-row">
                      <span 
                        className={`severity-tag ${isFirms ? 'tag-firms' : 'tag-eonet'}`}
                        style={{ backgroundColor: colors.fill, color: '#ffffff' }}
                      >
                        {isFirms ? 'FIRMS Hotspot' : 'EONET Event'}
                      </span>
                      <span className="card-date">{fire.formattedDate}</span>
                    </div>

                    <h4 className="card-title">{fire.title}</h4>

                    <div className="card-bottom-row">
                      <span className="card-location">
                        <MapPin size={14} />
                        {fire.country} ({fire.region})
                      </span>
                      <span className="card-coords">
                        {fire.latitude.toFixed(2)}°, {fire.longitude.toFixed(2)}°
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
