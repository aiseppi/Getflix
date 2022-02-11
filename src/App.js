import React from "react";
import "./styles.css";
import SearchDatabase from "./pages/SearchDatabase/layout";
import PageHeader from "./components/PageHeader/PageHeader";

export default function App() {
  return (
    <div className="App">
      <PageHeader />
      <SearchDatabase />
    </div>
  );
}
