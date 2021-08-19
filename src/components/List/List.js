import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";

const List = ({ places, childClicked, isLoading }) => {
  const classes = useStyles();
  const [type, setType] = useState("restaurant");
  const [rating, setRating] = useState(0);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => references[i] || createRef());
    setReferences(refs);
    
  }, [places]);

  console.log("This is: ", { childClicked });

  return (
    <div className={classes.container}>
      <Typography variant="h6">
        Restaurants, Hotels & Attractions Near You
      </Typography>
      {isLoading ? (
        <div className={classes.container}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <React.Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurant">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3 stars</MenuItem>
              <MenuItem value={4}>Above 4 stars</MenuItem>
              <MenuItem value={4.5}>Above 4.5 stars</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => {
              return (
                <Grid item key={i} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={references[i]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </React.Fragment>
      )}
    </div>
  );
};

export default List;
