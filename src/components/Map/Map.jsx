import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ location }) => {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  useEffect(() => {
    if (location) {
      setMapCenter([location.lat, location.lon]);
    }
  }, [location]);

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <Marker position={mapCenter}>
            <Popup>{location.display_name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
