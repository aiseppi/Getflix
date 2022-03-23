import React, { useEffect, useState } from "react";
import DataCard from "../DataCard/DataCard";
import styled from "styled-components";

const StyledContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function DataCardContainer({ filterText, page, getTotalPages }) {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      getMovies();
      async function getMovies() {
        setCounter(counter + 1);
        const response = await fetch(url);
        const data = await response.json();
        const { results, total_pages } = data;
        handleTotalPages(total_pages);
        // let filteredResults = results.filter(item => item.media_type != "person");
        // console.log(filteredResults);
        setDataList(results ? results : []);
        console.log(results);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [filterText]);

  useEffect(() => {
    getMovies();
    async function getMovies() {
      setCounter(counter + 1);
      const response = await fetch(url);
      const data = await response.json();
      const { results, total_pages } = data;
      handleTotalPages(total_pages);
      //       let filteredResults = results.filter(item => item.media_type != "person");
      // console.log(filteredResults);
      setDataList(results ? results : []);
    }
  }, [page]);

  let finalList = dataList
    ? dataList.map((item) => {
        return (
          <DataCard key={item.id} item={item}>
            {" "}
          </DataCard>
        );
      })
    : [];

  return (
    <div>
      <StyledContainer id="cardsContainer">{finalList}</StyledContainer>
    </div>
  );
}
