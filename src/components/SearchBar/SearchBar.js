import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

import "./SearchBar.css";

export default function SearchBar({ onFilterChanged }) {
  const StyledTextField = styled(TextField)`
    color: #e52a6f;
    width: 500px;

    & .Mui-focused fieldset {
      border-color: #5f0f4e !important;
      color: #e52a6f !important;
    }

    & .Mui-focused:hover fieldset {
      border-color: #5f0f4e !important;
    }
    & :hover fieldset {
      border: 2px solid #e52a6f !important;
    }
  `;

  function handleFilterTextChanged(e) {
    onFilterChanged(e.target.value);
  }

  return (
    <div id="searchBarContainer">
      <div>
        <StyledTextField
          id="textField"
          label="I'm looking for..."
          variant="outlined"
          style={{ width: "75%" }}
          color="secondary"
          onChange={handleFilterTextChanged}
        />
      </div>
    </div>
  );
}
