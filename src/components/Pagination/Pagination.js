import React from "react";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/styles";

const StyledPaginationContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px 0"
});

const StyledPaginationMobile = styled(Pagination)({
  width: "100%",
  display: "block",
  margin: "auto",

  "@media (min-width: 500px)": {
    display: "none"
  }
});
const StyledPaginationDesktop = styled(Pagination)({
  display: "none",

  "@media (min-width: 500px)": {
    display: "block",
    width: "100%",
    margin: "auto"
  }
});

export default function PaginationBar({ onPageChange, totalPages, page }) {
  function handleOnPageChange(e, value) {
    onPageChange(value);
  }

  console.log(totalPages);

  return (
    <div>
      <StyledPaginationContainer id="paginationContainer">
        <StyledPaginationMobile
          className="mobile-pagination"
          id="pagination"
          count={totalPages - 1}
          siblingCount={0}
          boundaryCount={0}
          color="secondary"
          defaultPage={1}
          page={page}
          onChange={handleOnPageChange}
          showFirstButton
          showLastButton
          size="large"
        />

        <StyledPaginationDesktop
          className="desktop-pagination"
          id="pagination"
          count={totalPages - 1}
          color="secondary"
          defaultPage={1}
          page={page}
          onChange={handleOnPageChange}
          showFirstButton
          showLastButton
        />
      </StyledPaginationContainer>
    </div>
  );
}
