import React from "react";
import Pagination from "@mui/material/Pagination";
import "./Pagination.css";

export default function PaginationBar({ onPageChange, totalPages, page }) {
  function handleOnPageChange(e, value) {
    onPageChange(value);
  }

  console.log(totalPages);

  return (
    <div id="paginationContainer">
      <Pagination
        id="pagination"
        count={totalPages}
        color="secondary"
        defaultPage={1}
        page={page}
        onChange={handleOnPageChange}
      />
    </div>
  );
}
