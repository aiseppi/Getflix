import React from "react";
import "./styles.css";
import SearchDatabase from "./pages/SearchDatabase/layout";
import PageHeader from "./components/PageHeader/PageHeader";
import { styled } from "@mui/styles";

const StyledApp = styled("div")({
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center"
});

export default function App() {
  return (
    <StyledApp className="App">
      <PageHeader />
      <SearchDatabase />
    </StyledApp>
  );
}
