import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { BrowserRouter as ROUTER } from "react-router-dom";

// components to test
import Landing from "../components/Routes/Landing";
import Guide from "../components/Routes/Guide";
import Gallery from "../components/Routes/Gallery";
import FAQs from "../components/Routes/FAQs";
import Login from "../components/Routes/Login";
import Registration from "../components/Routes/Registration";
// import DownloadPage from "../components/Routes/DownloadPage";
// import PublicCard from "../components/Routes/PublicCard";
// import PrivateCard from "../components/Routes/PrivateCard";
// import UserHome from "../components/Routes/UserHome";
// import Email from "../components/Routes/Email";
import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";

configure({ adapter: new Adapter() });

describe("Components Within Router System", () => {
  it("renders Landing.js without crashing", () => {
    const landing = shallow(
      <ROUTER>
        <Landing />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(landing, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Gallery.js without crashing", () => {
    const gallery = shallow(
      <ThemeProvider>
        <GalleryProvider>
          <UserProvider>
            <CardProvider>
              <PubCardProvider>
                <ROUTER>
                  <Gallery />
                </ROUTER>
              </PubCardProvider>
            </CardProvider>
          </UserProvider>
        </GalleryProvider>
      </ThemeProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(gallery, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Nav.js without crashing", () => {
    // const nav = shallow(
    //   <ThemeProvider>
    //     <GalleryProvider>
    //       <UserProvider>
    //         <CardProvider>
    //           <PubCardProvider>
    //             <App>
    //               <Nav />
    //             </App>
    //           </PubCardProvider>
    //         </CardProvider>
    //       </UserProvider>
    //     </GalleryProvider>
    //   </ThemeProvider>
    // );
    // const div = document.createElement("div");
    // ReactDOM.render(nav, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
});
