import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledSearchContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center"
});

const StyledTextField = styled(TextField)({
  borderColor: "#e52a6f !important",
  width: "350px !important",
  fullWidth: "true",

  "& .Mui-focused fieldset": {
    borderColor: "#5f0f4e !important",
    color: "#e52a6f !important"
  },

  "& .Mui-focused:hover fieldset": {
    borderColor: "#5f0f4e !important"
  },

  "& :hover fieldset": {
    border: "2px solid #e52a6f !important"
  }
});
export default function SearchBar({ onFilterChanged }) {
  function handleFilterTextChanged(e) {
    onFilterChanged(e.target.value);
  }

  return (
    <StyledSearchContainer id="searchBarContainer">
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
    </StyledSearchContainer>
  );
}
