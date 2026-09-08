import React from 'react';
import { 
  Flame, 
  BarChart3, 
  Download, 
  RefreshCw, 
  FlameKindling, 
  Map as MapIcon,
  Layers,
  Sparkles,
  Radio,
  Eye,
  CloudSun
} from 'lucide-react';

export const Header = ({ 
  eonetCount,
  firmsCount,
  highSeverityCount, 
  isMock, 
  activeTab, 
  setActiveTab, 
  onRefresh, 
  isRefreshing, 
  onExportCSV,
  autoRefreshEnabled,
  setAutoRefreshEnabled,
  // Layer Controls
  showEonet,
  setShowEonet,
  showFirms,
  setShowFirms,
  showHeatmap,
  setShowHeatmap,
  showWeather,
  setShowWeather
}) => {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-icon-wrapper">
          <Flame className="logo-icon" size={28} />
          <span className="logo-pulse"></span>
        </div>
        <div className="brand-text">
          <h1>WILDFIRE <span className="highlight">TRACKER</span></h1>
          <p className="brand-subtitle">NASA EONET & FIRMS Telemetry Engine</p>
        </div>
      </div>

      {/* Header Metric Counters */}
      <div className="header-stats">
        <div className="stat-pill eonet-pill" title="Active NASA EONET Wildfire Events">
          <FlameKindling size={16} className="stat-icon red" />
          <span className="stat-value">{eonetCount}</span>
          <span className="stat-label">EONET</span>
        </div>

        <div className="stat-pill firms-pill" title="Active NASA FIRMS Satellite Thermal Hotspots">
          <Radio size={16} className="stat-icon orange" />
          <span className="stat-value">{firmsCount}</span>
          <span className="stat-label">FIRMS</span>
        </div>

        <div className="stat-pill critical-pill">
          <span className="stat-dot red-pulsing"></span>
          <span className="stat-value">{highSeverityCount}</span>
          <span className="stat-label">High Threat</span>
        </div>

        {isMock && (
          <div className="stat-pill mock-badge" title="Operating with integrated telemetry fallback snapshot">
            <Sparkles size={14} />
            <span>Telemetry Active</span>
          </div>
        )}
      </div>

      {/* Layer Controls Bar */}
      {activeTab === 'map' && (
        <div className="layer-control-toolbar" title="Map Layer Visibility Controls">
          <span className="layer-toolbar-label"><Eye size={14} /> Layers:</span>
          
          <label className={`layer-checkbox-pill eonet-layer ${showEonet ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              checked={showEonet} 
              onChange={(e) => setShowEonet(e.target.checked)} 
            />
            <span className="layer-color-dot red-dot"></span>
            <span>EONET</span>
          </label>

          <label className={`layer-checkbox-pill firms-layer ${showFirms ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              checked={showFirms} 
              onChange={(e) => setShowFirms(e.target.checked)} 
            />
            <span className="layer-color-dot orange-dot"></span>
            <span>FIRMS</span>
          </label>

          <label className={`layer-checkbox-pill heatmap-layer ${showHeatmap ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              checked={showHeatmap} 
              onChange={(e) => setShowHeatmap(e.target.checked)} 
            />
            <Layers size={14} />
            <span>Heatmap</span>
          </label>

          <label className={`layer-checkbox-pill weather-layer ${showWeather ? 'active' : ''}`}>
            <input 
              type="checkbox" 
              checked={showWeather} 
              onChange={(e) => setShowWeather(e.target.checked)} 
            />
            <CloudSun size={14} />
            <span>Weather Info</span>
          </label>
        </div>
      )}

      {/* Header Action Controls */}
      <div className="header-actions">
        {/* View Switcher: Map / Analytics */}
        <div className="view-switch-group">
          <button 
            className={`switch-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <MapIcon size={16} />
            <span>Map View</span>
          </button>

          <button 
            className={`switch-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={16} />
            <span>Historical Analytics</span>
          </button>
        </div>

        {/* CSV Export */}
        <button 
          className="action-btn btn-ghost" 
          onClick={onExportCSV} 
          title="Export Active Wildfire & Hotspot Data to CSV"
        >
          <Download size={18} />
          <span className="btn-text">Export CSV</span>
        </button>

        {/* Manual Sync */}
        <button 
          className={`action-btn btn-primary ${isRefreshing ? 'spin' : ''}`} 
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh NASA Telemetry Feeds"
        >
          <RefreshCw size={18} />
          <span className="btn-text">Sync</span>
        </button>

        {/* Auto Refresh Switch */}
        <label className="auto-refresh-toggle" title="Auto Refresh telemetry every 5 minutes">
          <input 
            type="checkbox" 
            checked={autoRefreshEnabled} 
            onChange={(e) => setAutoRefreshEnabled(e.target.checked)} 
          />
          <span className="slider round"></span>
          <span className="toggle-label">Auto (5m)</span>
        </label>
      </div>
    </header>
  );
};
