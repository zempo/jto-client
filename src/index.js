import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";

// providers
import { GalleryContextProvider as GalleryProvider } from "./contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "./contexts/UserContext";
import { PublicCardContextProvider as PubCardProvider } from "./contexts/PublicCardContext";

// FONTS
// 'cursive'
import "typeface-great-vibes";
import "typeface-amatic-sc";
// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Amatic SC:400,700', 'cursive']
//   },
//   custom: {
//     families: ['The Indie Font'],
//     urls: ['/fonts/AmaticSC-Regular.ttf']
//   }
// });

ReactDOM.render(
  <ROUTER>
    <GalleryProvider>
      <UserProvider>
        <PubCardProvider>
          <App />
        </PubCardProvider>
      </UserProvider>
    </GalleryProvider>
  </ROUTER>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
