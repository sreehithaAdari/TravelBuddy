// App.jsx
import React, { useState } from "react";
import { Grid } from "@mui/material";
import "leaflet/dist/leaflet";
import "./styles.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { getPlaceDetails } from "../src/utils/api"; // Import the API function

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  const handlePlaceChanged = async (place) => {
    try {
      const placeDetails = await getPlaceDetails(place);

      setSelectedPlace(place);
      setMapLocation(placeDetails.coordinates);
    } catch (error) {
      console.error("Error getting place details:", error);
    }
  };

  return (
    <>
      <Header onPlaceChanged={handlePlaceChanged} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} style={{ margin: 0, marginTop: 0 }}>
          <Map location={mapLocation} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
