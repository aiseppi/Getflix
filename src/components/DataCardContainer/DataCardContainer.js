import React, { useEffect, useState } from "react";
import DataCard from "../DataCard/DataCard";
import "./DataCardContainer.css";

export default function DataCardContainer({
  filterText,
  page,
  getTotalPages
  // searchByTitleChecked,
  // searchByYearChecked
}) {
  function handleTotalPages(totalPages) {
    getTotalPages(totalPages);
  }
  const [counter, setCounter] = useState(0);
  const [dataList, setDataList] = useState("");
  const apiKey = "96cf33fdedaec4865a18d38e84e62ffc";
  const searchInput = filterText;
  let url = searchInput
    ? `
    https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1&include_adult=false&page=${page}`
    : `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`;
  console.log(url + "   url");
  useEffect(() => {
    const timer = setTimeout(() => {
      getMovies();
      async function getMovies() {
        setCounter(counter + 1);
        console.log("trying to fetch");
        const response = await fetch(url);
        console.log("awaiting response");
        const data = await response.json();
        const { results, total_pages } = data;
        handleTotalPages(total_pages);
        console.log(data);
        setDataList(results ? results : []);
      }
    }, 2000);
    console.log(`page: ${page}`);
    return () => clearTimeout(timer);
  }, [filterText]);

  useEffect(() => {
    getMovies();
    async function getMovies() {
      setCounter(counter + 1);
      console.log("trying to fetch");
      const response = await fetch(url);
      console.log("awaiting response");
      const data = await response.json();
      const { results, total_pages } = data;
      handleTotalPages(total_pages);
      setDataList(results ? results : []);
    }
  }, [page]);
  console.log(dataList);

  let finalList = dataList
    ? dataList.map((item, index) => {
        return (
          <DataCard key={index} item={item}>
            {" "}
          </DataCard>
        );
      })
    : [];

  return (
    <div>
      <div id="cardsContainer">{finalList}</div>
    </div>
  );
}
