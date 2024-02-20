
import React from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './map.css'; // Import local map styles
import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
