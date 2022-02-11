import React, { useState } from "react";
import DataCardContainer from "../DataCardContainer/DataCardContainer";
import PaginationBar from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import "./FilterableDataTable.css";

export default function FilterableDataTable() {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  function handleFilterChanged(newText) {
    console.log(newText);
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
    <div id="mainContainer">
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
    </div>
  );
}
