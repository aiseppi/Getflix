import React, { useState } from "react";
import DataCardContainer from "../DataCardContainer/DataCardContainer";
import PaginationBar from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import "./FilterableDataTable.css";

export default function FilterableDataTable() {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  // const [searchByTitle, setSearchByTitle] = useState(true);
  // const [searchByYear, setSearchByYear] = useState(false);

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
  // function handleTitleRadioChecked(checked) {
  //   console.log("search by title checked!");
  //   setSearchByTitle(checked);
  // }

  // function handleYearRadioChecked(checked) {
  //   console.log("search by year checked!");
  //   setSearchByYear(checked);
  // }
  return (
    <div id="mainContainer">
      <SearchBar
        onFilterChanged={handleFilterChanged}
        // onTitleRadioChecked={handleTitleRadioChecked}
        // onYearRadioChecked={handleYearRadioChecked}
      />
      <PaginationBar
        onPageChange={handlePageChange}
        totalPages={totalPages}
        page={page}
      />
      <DataCardContainer
        filterText={filterText}
        page={page}
        getTotalPages={handleTotalPageUpdate}
        // searchByTitleChecked={searchByTitle}
        // searchByYearChecked={searchByYear}
      />
      <PaginationBar
        onPageChange={handlePageChange}
        totalPages={totalPages}
        page={page}
      />
    </div>
  );
}
