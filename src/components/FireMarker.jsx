import React from 'react';

export const getSeverityColor = (severity, type = 'EONET') => {
  if (type === 'FIRMS') {
    switch ((severity || '').toUpperCase()) {
      case 'CRITICAL':
        return { fill: '#ff6b00', stroke: '#c2410c', pulse: '#ff8c00', glow: 'rgba(255, 107, 0, 0.7)' };
      case 'HIGH':
        return { fill: '#f97316', stroke: '#9a3412', pulse: '#fb923c', glow: 'rgba(249, 115, 22, 0.6)' };
      case 'MEDIUM':
        return { fill: '#fbbf24', stroke: '#b45309', pulse: '#fde047', glow: 'rgba(251, 191, 36, 0.5)' };
      case 'LOW':
      default:
        return { fill: '#fb923c', stroke: '#ea580c', pulse: '#ffedd5', glow: 'rgba(251, 146, 60, 0.4)' };
    }
  }

  // EONET Red Theme
  switch ((severity || '').toUpperCase()) {
    case 'CRITICAL':
      return { fill: '#ef4444', stroke: '#991b1b', pulse: '#f87171', glow: 'rgba(239, 68, 68, 0.7)' };
    case 'HIGH':
      return { fill: '#dc2626', stroke: '#7f1d1d', pulse: '#ef4444', glow: 'rgba(220, 38, 38, 0.6)' };
    case 'MEDIUM':
      return { fill: '#eab308', stroke: '#a16207', pulse: '#fde047', glow: 'rgba(234, 179, 8, 0.5)' };
    case 'LOW':
    default:
      return { fill: '#3b82f6', stroke: '#1d4ed8', pulse: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)' };
  }
};

/**
 * Returns custom HTML SVG icon string for Leaflet markers
 */
export const createLeafletMarkerIcon = (item, isSelected = false) => {
  const isFirms = item.type === 'FIRMS';
  const colors = getSeverityColor(item.severity, item.type);
  const size = isSelected ? 42 : 32;

  const iconSvg = isFirms ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2"></path>
    </svg>
  ` : `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"></path>
    </svg>
  `;

  return `
    <div class="custom-fire-marker ${isFirms ? 'firms-marker' : 'eonet-marker'} ${isSelected ? 'selected-marker' : ''}" style="width:${size}px; height:${size}px;">
      <span class="marker-pulse-ring" style="background:${colors.glow};"></span>
      <div class="marker-core" style="background:${colors.fill}; border:2px solid ${colors.stroke};">
        ${iconSvg}
      </div>
    </div>
  `;
};

export const FireMarker = ({ wildfire, onClick, isSelected }) => {
  const isFirms = wildfire.type === 'FIRMS';
  const colors = getSeverityColor(wildfire.severity, wildfire.type);

  return (
    <div 
      className={`fire-marker-wrapper ${isFirms ? 'firms' : 'eonet'} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(wildfire)}
      title={`${wildfire.title} (${wildfire.type || 'EONET'})`}
    >
      <div className="pulse-wave" style={{ backgroundColor: colors.glow }} />
      <div 
        className="marker-icon" 
        style={{ 
          backgroundColor: colors.fill, 
          borderColor: colors.stroke,
          boxShadow: `0 0 15px ${colors.glow}`
        }}
      >
        {isFirms ? '📡' : '🔥'}
      </div>
    </div>
  );
};
