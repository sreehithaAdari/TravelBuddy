


// import React, { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import "./map.css";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import { getPlaceDetails } from "../../utils/api";// adjust the path as needed

// const Map = ({ location }) => {
//   const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
//   const [displayName, setDisplayName] = useState("");

//   useEffect(() => {
//     const fetchPlaceDetails = async () => {
//       try {
//         if (location) {
//           const placeDetails = await getPlaceDetails(location);
//           setDisplayName(placeDetails.details.display_name);
//           setMapCenter([placeDetails.coordinates.lat, placeDetails.coordinates.lon]);
//         }
//       } catch (error) {
//         console.error("Error fetching place details:", error);
//       }
//     };

//     fetchPlaceDetails();
//   }, [location]);

//   const DynamicMap = () => {
//     const map = useMap();

//     useEffect(() => {
//       if (location) {
//         map.setView([location.lat, location.lon], map.getZoom());
//       }
//     }, [location, map]);

//     return null;
//   };

//   return (
//     <div className="map-container">
//       <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {location && (
//           <Marker position={[location.lat, location.lon]}>
//             <Popup>{displayName}</Popup>
//           </Marker>
//         )}
//         <DynamicMap />
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;


import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { getPlaceDetails, getNearbyTouristAttractions } from "../../utils/api"; // adjust the path as needed

const Map = ({ location }) => {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [displayName, setDisplayName] = useState("");
  const [nearbyAttractions, setNearbyAttractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location) {
          const placeDetails = await getPlaceDetails(location);
          setDisplayName(placeDetails.details.display_name);
          setMapCenter([placeDetails.coordinates.lat, placeDetails.coordinates.lon]);

          // Fetch nearby tourist attractions
          const attractions = await getNearbyTouristAttractions(placeDetails.coordinates);
          setNearbyAttractions(attractions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  const DynamicMap = () => {
    const map = useMap();

    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lon], map.getZoom());
      }
    }, [location, map]);

    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <>
            <Marker position={[location.lat, location.lon]}>
              <Popup>{displayName}</Popup>
            </Marker>
            {nearbyAttractions.map((attraction, index) => (
              <Marker
                key={index}
                position={[attraction.coordinates.lat, attraction.coordinates.lon]}
              >
                <Popup>{attraction.name}</Popup>
              </Marker>
            ))}
          </>
        )}
        <DynamicMap />
      </MapContainer>
    </div>
  );
};

export default Map;
