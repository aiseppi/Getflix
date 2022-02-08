import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import fontawesome from "@fortawesome/fontawesome";
// import fas from '@fortawesome/fontawesome-free-solid';
// import far from '@fortawesome/fontawesome-free-regular';

// fontawesome.library.add(fas, far);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
