import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, MarkerClustererF, HeatmapLayerF } from '@react-google-maps/api';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import { createLeafletMarkerIcon, getSeverityColor } from './FireMarker';
import { LocateFixed } from 'lucide-react';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Dark Theme map style JSON for Google Maps
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4b687a" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d5a" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1726" }] }
];

const defaultCenter = { lat: 25.0, lng: 0.0 };
const defaultZoom = 2;

// Helper subcomponent for Leaflet map camera control
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.lat !== undefined && center.lng !== undefined) {
      map.flyTo([center.lat, center.lng], zoom || 6, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export const Map = ({ 
  eonetEvents = [], 
  firmsHotspots = [], 
  selectedFire, 
  onSelectFire, 
  showEonet = true,
  showFirms = true,
  showHeatmap = false
}) => {
  const [mapEngine, setMapEngine] = useState(GOOGLE_MAPS_KEY ? 'google' : 'leaflet');
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  const [mapType, setMapType] = useState('dark'); // 'dark' | 'satellite'

  // Load Google Maps JavaScript API with Visualization library for Heatmap
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    libraries: ['visualization']
  });

  useEffect(() => {
    if (loadError || !GOOGLE_MAPS_KEY) {
      setMapEngine('leaflet');
    }
  }, [loadError]);

  // Handle selected item camera fly-to
  useEffect(() => {
    if (selectedFire && selectedFire.latitude && selectedFire.longitude) {
      setMapCenter({ lat: selectedFire.latitude, lng: selectedFire.longitude });
      setMapZoom(7);
    }
  }, [selectedFire]);

  const handleResetView = () => {
    setMapCenter(defaultCenter);
    setMapZoom(defaultZoom);
  };

  // Combine active markers based on layer toggles
  const activeEonetMarkers = useMemo(() => showEonet ? eonetEvents : [], [showEonet, eonetEvents]);
  const activeFirmsMarkers = useMemo(() => showFirms ? firmsHotspots : [], [showFirms, firmsHotspots]);
  const combinedHeatmapData = useMemo(() => {
    const list = [];
    if (showEonet) list.push(...eonetEvents);
    if (showFirms) list.push(...firmsHotspots);
    return list;
  }, [showEonet, showFirms, eonetEvents, firmsHotspots]);

  // Render Leaflet Map (Fallback or Primary)
  const renderLeafletMap = () => {
    const tileUrl = mapType === 'satellite' 
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    const attribution = mapType === 'satellite'
      ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
      : '&copy; OpenStreetMap contributors &copy; CARTO';

    return (
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', backgroundColor: '#090d16' }}
        zoomControl={false}
      >
        <TileLayer url={tileUrl} attribution={attribution} />
        <MapRecenter center={mapCenter} zoom={mapZoom} />

        {/* Heatmap Circles Layer */}
        {showHeatmap && combinedHeatmapData.map(item => {
          const colors = getSeverityColor(item.severity, item.type);
          return (
            <CircleMarker
              key={`heat-${item.id}`}
              center={[item.latitude, item.longitude]}
              radius={item.type === 'FIRMS' ? 24 : 36}
              pathOptions={{
                fillColor: colors.fill,
                fillOpacity: 0.35,
                color: colors.stroke,
                weight: 1
              }}
            />
          );
        })}

        {/* EONET Red Fire Markers */}
        {showEonet && eonetEvents.map((item) => {
          const isSelected = selectedFire && selectedFire.id === item.id;
          const customIconHtml = createLeafletMarkerIcon(item, isSelected);
          
          const icon = L.divIcon({
            html: customIconHtml,
            className: 'custom-leaflet-div-icon',
            iconSize: [isSelected ? 42 : 32, isSelected ? 42 : 32],
            iconAnchor: [isSelected ? 21 : 16, isSelected ? 21 : 16]
          });

          return (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={icon}
              eventHandlers={{ click: () => onSelectFire(item) }}
            >
              {isSelected && (
                <Popup className="custom-leaflet-popup" position={[item.latitude, item.longitude]}>
                  <div className="leaflet-popup-content-inner">
                    <h4>{item.title}</h4>
                    <p className="popup-country">📍 {item.country} ({item.region})</p>
                    <div className="popup-footer">
                      <span className="badge badge-eonet">NASA EONET</span>
                      <span className="popup-date">{item.formattedDate}</span>
                    </div>
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}

        {/* FIRMS Orange Hotspot Markers */}
        {showFirms && firmsHotspots.map((item) => {
          const isSelected = selectedFire && selectedFire.id === item.id;
          const customIconHtml = createLeafletMarkerIcon(item, isSelected);
          
          const icon = L.divIcon({
            html: customIconHtml,
            className: 'custom-leaflet-div-icon firms-icon',
            iconSize: [isSelected ? 42 : 32, isSelected ? 42 : 32],
            iconAnchor: [isSelected ? 21 : 16, isSelected ? 21 : 16]
          });

          return (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={icon}
              eventHandlers={{ click: () => onSelectFire(item) }}
            >
              {isSelected && (
                <Popup className="custom-leaflet-popup" position={[item.latitude, item.longitude]}>
                  <div className="leaflet-popup-content-inner">
                    <h4>{item.title}</h4>
                    <p className="popup-country">📡 Satellite Thermal Detection - {item.country}</p>
                    <div className="popup-footer">
                      <span className="badge badge-firms">NASA FIRMS</span>
                      <span className="popup-date">{item.formattedDate}</span>
                    </div>
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    );
  };

  // Render Google Map
  const renderGoogleMap = () => {
    const googleHeatmapData = combinedHeatmapData.map(item => ({
      location: new window.google.maps.LatLng(item.latitude, item.longitude),
      weight: item.severity === 'CRITICAL' ? 4 : item.severity === 'HIGH' ? 3 : 2
    }));

    return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          styles: mapType === 'dark' ? darkMapStyle : [],
          mapTypeId: mapType === 'satellite' ? 'hybrid' : 'roadmap',
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {/* Heatmap Layer */}
        {showHeatmap && googleHeatmapData.length > 0 && (
          <HeatmapLayerF data={googleHeatmapData} />
        )}

        {/* EONET Markers */}
        {showEonet && eonetEvents.map((item) => {
          const colors = getSeverityColor(item.severity, 'EONET');
          const isSelected = selectedFire && selectedFire.id === item.id;

          return (
            <MarkerF
              key={item.id}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => onSelectFire(item)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: colors.fill,
                fillOpacity: 0.9,
                scale: isSelected ? 12 : 8,
                strokeColor: colors.stroke,
                strokeWeight: 2
              }}
            />
          );
        })}

        {/* FIRMS Markers with Marker Clustering Optimization */}
        {showFirms && (
          <MarkerClustererF>
            {(clusterer) => (
              <>
                {firmsHotspots.map((item) => {
                  const colors = getSeverityColor(item.severity, 'FIRMS');
                  const isSelected = selectedFire && selectedFire.id === item.id;

                  return (
                    <MarkerF
                      key={item.id}
                      position={{ lat: item.latitude, lng: item.longitude }}
                      onClick={() => onSelectFire(item)}
                      clusterer={clusterer}
                      icon={{
                        path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        fillColor: colors.fill,
                        fillOpacity: 0.95,
                        scale: isSelected ? 7 : 5,
                        strokeColor: colors.stroke,
                        strokeWeight: 2
                      }}
                    />
                  );
                })}
              </>
            )}
          </MarkerClustererF>
        )}

        {selectedFire && (
          <InfoWindowF
            position={{ lat: selectedFire.latitude, lng: selectedFire.longitude }}
            onCloseClick={() => onSelectFire(null)}
          >
            <div className="google-info-popup">
              <h4>{selectedFire.title}</h4>
              <p>📍 {selectedFire.country} ({selectedFire.region})</p>
              <p>Source: <strong>{selectedFire.type || 'EONET'}</strong></p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="map-wrapper">
      {/* Map Control Bar Overlay */}
      <div className="map-toolbar">
        <button 
          className={`map-tool-btn ${mapType === 'dark' ? 'active' : ''}`}
          onClick={() => setMapType('dark')}
          title="Dark Map Theme"
        >
          Dark Map
        </button>
        <button 
          className={`map-tool-btn ${mapType === 'satellite' ? 'active' : ''}`}
          onClick={() => setMapType('satellite')}
          title="Satellite Map View"
        >
          Satellite
        </button>

        <div className="toolbar-divider" />

        <button 
          className="map-tool-btn icon-only" 
          onClick={handleResetView}
          title="Recenter World View"
        >
          <LocateFixed size={16} />
        </button>

        <span className="map-engine-tag">
          {mapEngine === 'google' ? 'Google Maps' : 'Leaflet OSM'}
        </span>
      </div>

      {/* Render selected map provider */}
      {mapEngine === 'google' && isLoaded ? renderGoogleMap() : renderLeafletMap()}
    </div>
  );
};
