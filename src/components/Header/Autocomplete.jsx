import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getPlaceDetails } from "../../utils/api"; // Adjust the path based on your actual file structure

const AutocompleteComponent = ({
  onPlaceChanged,
  onLoad,
  onLocationChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue.length > 2) {
      const places = await onLoad(newInputValue);
      setOptions(places);
    }
  };

  const handlePlaceSelect = async (place) => {
    const details = await getPlaceDetails(place.place_id);
    onPlaceChanged(details);
    onLocationChange(details.location);
  };

  return (
    <Autocomplete
      value={null}
      onChange={(event, newValue) => handlePlaceSelect(newValue)}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => (option ? option.display_name : "")}
      loadingText="Loading..."
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a place"
          variant="standard"
        />
      )}
    />
  );
};

export default AutocompleteComponent;
