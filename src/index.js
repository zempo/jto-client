import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";

// providers
import GalleryContextProvider from "./contexts/GalleryContext";

ReactDOM.render(
  <ROUTER>
    <GalleryContextProvider>
      <App />
    </GalleryContextProvider>
  </ROUTER>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
