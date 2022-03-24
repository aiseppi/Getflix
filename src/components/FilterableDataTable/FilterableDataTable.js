import React, { useState } from "react";
import DataCardContainer from "../DataCardContainer/DataCardContainer";
import PaginationBar from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import { styled } from "@mui/styles";

const StyledMainContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  margin: 0
});
const StyledSearchBar = styled(SearchBar)({});

export default function FilterableDataTable() {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  function handleFilterChanged(newText) {
    setFilterText(newText);
    setPage(1);
  }

  function handlePageChange(number) {
    setPage(number);
  }
  function handleTotalPageUpdate(number) {
    setTotalPages(number);
  }

  return (
    <StyledMainContainer id="mainContainer">
      <SearchBar onFilterChanged={handleFilterChanged} />
      <PaginationBar
        onPageChange={handlePageChange}
        totalPages={totalPages}
        page={page}
      />
      <DataCardContainer
        filterText={filterText}
        page={page}
        getTotalPages={handleTotalPageUpdate}
      />
      <PaginationBar
        onPageChange={handlePageChange}
        totalPages={totalPages}
        page={page}
      />
    </StyledMainContainer>
  );
}
