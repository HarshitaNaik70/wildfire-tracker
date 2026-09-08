import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Globe, 
  ExternalLink, 
  Flame, 
  Copy, 
  Check, 
  Compass,
  AlertTriangle,
  Radio,
  CloudSun,
  Thermometer,
  Wind,
  Droplets,
  Building2,
  Navigation,
  Loader2
} from 'lucide-react';
import { getSeverityColor } from './FireMarker';

export const FireInfo = ({ 
  wildfire, 
  onClose, 
  onCenterOnMap,
  // Weather & Nearby Cities props
  showWeather = true,
  weatherData,
  weatherLoading,
  weatherError,
  nearbyCities = [],
  citiesLoading,
  citiesError
}) => {
  const [copied, setCopied] = useState(false);

  if (!wildfire) return null;

  const colors = getSeverityColor(wildfire.severity, wildfire.type);

  const handleCopyCoords = () => {
    const coordsStr = `${wildfire.latitude.toFixed(4)}, ${wildfire.longitude.toFixed(4)}`;
    navigator.clipboard.writeText(coordsStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fire-info-card glassmorphism">
      {/* Header */}
      <div className="fire-info-header" style={{ borderColor: colors.stroke }}>
        <div className="title-area">
          <div className="severity-badge-pill" style={{ backgroundColor: colors.fill, color: '#ffffff' }}>
            <Flame size={14} />
            <span>{wildfire.severity}</span>
            {wildfire.type && <span className="source-tag">({wildfire.type})</span>}
          </div>
          <h3>{wildfire.title}</h3>
        </div>
        <button className="close-btn" onClick={onClose} title="Close details panel">
          <X size={18} />
        </button>
      </div>

      <div className="fire-info-body">
        {/* Description */}
        <p className="description-text">{wildfire.description}</p>

        {/* Info Grid */}
        <div className="info-grid">
          <div className="info-cell">
            <div className="info-cell-icon"><MapPin size={16} /></div>
            <div className="info-cell-content">
              <span className="info-label">Location</span>
              <span className="info-value">{wildfire.country} ({wildfire.region})</span>
            </div>
          </div>

          <div className="info-cell">
            <div className="info-cell-icon"><Calendar size={16} /></div>
            <div className="info-cell-content">
              <span className="info-label">Detected On</span>
              <span className="info-value">{wildfire.formattedDate}</span>
            </div>
          </div>

          <div className="info-cell">
            <div className="info-cell-icon"><Compass size={16} /></div>
            <div className="info-cell-content">
              <span className="info-label">Coordinates</span>
              <span className="info-value code-font">
                {wildfire.latitude.toFixed(4)}°, {wildfire.longitude.toFixed(4)}°
              </span>
            </div>
          </div>

          {wildfire.magnitudeValue && (
            <div className="info-cell">
              <div className="info-cell-icon"><AlertTriangle size={16} /></div>
              <div className="info-cell-content">
                <span className="info-label">Estimated Extent</span>
                <span className="info-value">
                  {wildfire.magnitudeValue.toLocaleString()} {wildfire.magnitudeUnit || 'Units'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sources Section */}
        {wildfire.sources && wildfire.sources.length > 0 && (
          <div className="sources-section">
            <span className="section-label"><Globe size={14} /> Reporting Agencies & Sources:</span>
            <div className="sources-list">
              {wildfire.sources.map((src, idx) => (
                <a 
                  key={idx} 
                  href={src.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="source-chip"
                >
                  <span>{src.id || 'Telemetry Source'}</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* FEATURE 1: WEATHER INFORMATION SECTION (Below Details) */}
        {showWeather && (
          <div className="panel-section-card weather-panel-section glassmorphism">
            <div className="card-header-bar">
              <div className="header-title-group">
                <CloudSun size={16} className="card-icon text-orange" />
                <h4>Weather Information</h4>
              </div>
              <span className="fire-target-tag">Telemetry Forecast</span>
            </div>

            {weatherLoading ? (
              <div className="card-loading-state">
                <Loader2 size={18} className="animate-spin text-orange" />
                <span>Fetching location weather...</span>
              </div>
            ) : weatherError ? (
              <div className="card-error-state">
                <span>Unable to load weather data.</span>
              </div>
            ) : weatherData ? (
              <div className="weather-grid">
                <div className="weather-item">
                  <Thermometer size={14} className="item-icon red" />
                  <div className="item-text">
                    <span className="item-label">Temperature</span>
                    <span className="item-value highlight">{weatherData.temperature}</span>
                  </div>
                </div>

                <div className="weather-item">
                  <Droplets size={14} className="item-icon blue" />
                  <div className="item-text">
                    <span className="item-label">Humidity</span>
                    <span className="item-value">{weatherData.humidity}</span>
                  </div>
                </div>

                <div className="weather-item">
                  <Wind size={14} className="item-icon green" />
                  <div className="item-text">
                    <span className="item-label">Wind Speed</span>
                    <span className="item-value">{weatherData.windSpeed}</span>
                  </div>
                </div>

                <div className="weather-item">
                  <CloudSun size={14} className="item-icon yellow" />
                  <div className="item-text">
                    <span className="item-label">Condition</span>
                    <span className="item-value condition-text">{weatherData.condition}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* FEATURE 2: NEARBY CITIES AT RISK SECTION (Below Weather) */}
        <div className="panel-section-card cities-panel-section glassmorphism">
          <div className="card-header-bar">
            <div className="header-title-group">
              <Building2 size={16} className="card-icon text-red" />
              <h4>Nearby Cities at Risk</h4>
            </div>
            <span className="fire-target-tag">Top 5 Nearest</span>
          </div>

          {citiesLoading ? (
            <div className="card-loading-state">
              <Loader2 size={18} className="animate-spin text-red" />
              <span>Calculating spatial proximity to cities...</span>
            </div>
          ) : citiesError ? (
            <div className="card-error-state">
              <span>Unable to calculate nearby city distances.</span>
            </div>
          ) : nearbyCities.length > 0 ? (
            <div className="cities-list-container">
              {nearbyCities.map((city) => (
                <div key={city.name} className="city-row-item">
                  <div className="city-info-left">
                    <Navigation size={13} className="city-pin-icon" />
                    <span className="city-name">{city.name}</span>
                    <span className="city-country">({city.country})</span>
                  </div>
                  <span className="city-distance-badge">{city.formattedDistance}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-empty-state">
              <span>No major cities within immediate proximity.</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fire-info-footer">
        <button className="btn-secondary" onClick={handleCopyCoords}>
          {copied ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
          <span>{copied ? 'Coordinates Copied' : 'Copy Coords'}</span>
        </button>

        <button className="btn-primary" onClick={() => onCenterOnMap(wildfire)}>
          <Radio size={16} />
          <span>Locate on Map</span>
        </button>
      </div>
    </div>
  );
};
