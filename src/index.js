import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";

// providers
import { ThemeContextProvider as ThemeProvider } from "./contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "./contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "./contexts/UserContext";
import { CardContextProvider as CardProvider } from "./contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "./contexts/PublicCardContext";

// FONTS
// 'cursive'
import "typeface-cedarville-cursive";
// 'cursive+'
import "typeface-great-vibes";
// 'indie'
import "typeface-amatic-sc";
// 'handwritten'
import "typeface-shadows-into-light-two";
// handwritten-bold
import "typeface-gochi-hand";
// kiddo
import "typeface-gaegu";
// pen
import "typeface-nanum-pen-script";
// sharpie
import "typeface-permanent-marker";
// roboto
import "typeface-roboto";
// typed
import "typeface-cutive";
// quill
import "typeface-italianno";

ReactDOM.render(
  <ROUTER>
    <ThemeProvider>
      <GalleryProvider>
        <UserProvider>
          <CardProvider>
            <PubCardProvider>
              <App />
            </PubCardProvider>
          </CardProvider>
        </UserProvider>
      </GalleryProvider>
    </ThemeProvider>
  </ROUTER>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
