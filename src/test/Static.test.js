import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
// components to test
import Nav from "../components/Static/Nav";
import Footer from "../components/Static/Footer";
import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";

configure({ adapter: new Adapter() });

describe("Static Components", () => {
  it("renders Nav.js without crashing", () => {
    const nav = shallow(
      <ThemeProvider>
        <GalleryProvider>
          <UserProvider>
            <CardProvider>
              <PubCardProvider>
                <ROUTER>
                  <Nav />
                </ROUTER>
              </PubCardProvider>
            </CardProvider>
          </UserProvider>
        </GalleryProvider>
      </ThemeProvider>
    );
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(nav, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("renders Footer.js without crashing", () => {
    const footer = shallow(<Footer />);

    const div = document.createElement("div");
    ReactDOM.render(footer, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
