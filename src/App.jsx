import React from "react";
import { Grid } from "@mui/material";
import "leaflet/dist/leaflet";
import "./styles.css";

// import { MapContainer, TileLayer } from "react-leaflet";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";

const App = () => {
  return (
    <>
    
      <Header />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} style={{ margin: 0, marginTop: 0 }}>
          <Map />
        </Grid>
      </Grid>

      
    </>
  );
};

export default App;
