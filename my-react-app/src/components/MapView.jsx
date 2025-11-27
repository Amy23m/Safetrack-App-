import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DEFAULT_POSITION = [33.4202891, -111.930474];
//light Theme Map Tiles
const LIGHT_TILE_ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const LIGHT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//Dark Theme Map Tiles
const DARK_TILE_ATTRIBUTION = '© <a href="https://stadiamaps.com">Stadia Maps</a> contributors';
const DARK_TILE_URL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

// You can switch between LIGHT_TILE_* and DARK_TILE_* based on your app's theme
const TILE_ATTRIBUTION = DARK_TILE_ATTRIBUTION;
const TILE_URL = DARK_TILE_URL;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ nodes }) => {
  const defaultCenter = nodes.length > 0
    ? [nodes[0].latitude, nodes[0].longitude]
    : DEFAULT_POSITION;

  return (
    <div style={{ flexGrow: 1,height: '100vh', position: 'relative' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />

        {nodes.map((node) => {
          const status = (node.status || '').toLowerCase();

          const getColor = (s) => {
            if (s === 'sos') return '#ff0000';
            if (s === 'active') return '#22c55e';
            return '#94a3b8';
          };
          const getRadius = (s) => (s === 'sos' ? 12 : 8);

          return (
            <CircleMarker
              key={node.id}
              center={[node.latitude, node.longitude]}
              radius={getRadius(status)}
              pathOptions={{ color: getColor(status), fillColor: getColor(status), fillOpacity: 0.9 }}
            >
              <Popup>
                <strong>{node.name}</strong><br />
                Status: <span style={{ color: getColor(status) }}>{node.status}</span><br />
                Last Update: {new Date(node.lastUpdate).toLocaleTimeString()}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
