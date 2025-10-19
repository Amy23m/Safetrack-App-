import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DEFAULT_POSITION = [40.7128, -74.0060]; // New York City coordinates [replace with Node coordinates]

const TITLE_ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

const TITLE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
    return (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <MapContainer 
                center={DEFAULT_POSITION} 
                zoom={13} 
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            >
                <TileLayer
                    attribution={TITLE_ATTRIBUTION}
                    url={TITLE_URL}
                />
                <Marker position={DEFAULT_POSITION}>
                    <Popup>Node A -Active</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapView;