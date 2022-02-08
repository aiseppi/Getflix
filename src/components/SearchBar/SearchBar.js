import React from "react";
import TextField from "@mui/material/TextField";
import "./SearchBar.css";

export default function SearchBar({ onFilterChanged }) {
  function handleFilterTextChanged(e) {
    onFilterChanged(e.target.value);
  }

  return (
    <div id="searchBarContainer">
      <div>
        <TextField
          id="textField"
          label="Search Getflix"
          variant="outlined"
          style={{ width: "75%" }}
          color="secondary"
          onChange={handleFilterTextChanged}
        />
      </div>
    </div>
  );
}
