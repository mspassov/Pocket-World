import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lng: 0 },
  });
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //get the current coordinates of a user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setLoading(false);
    });
  }, [coordinates, bounds]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100" }}>
        <Grid item xs={12} md={4}>
          <List places={places} childClicked={childClicked} isLoading={isLoading}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
