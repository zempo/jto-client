import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components to test
import Landing from "../components/Routes/Landing";
import Guide from "../components/Routes/Guide";
import Gallery from "../components/Routes/Gallery";
import UserHome from "../components/Routes/UserHome";
import FAQs from "../components/Routes/FAQs";
import Login from "../components/Routes/Login";
import Registration from "../components/Routes/Registration";
import DownloadPage from "../components/Routes/DownloadPage";
import PrivateCards from "../components/Routes/PrivateCards";
import PrivateCard from "../components/Routes/PrivateCard";
import PublicCard from "../components/Routes/PublicCard";
import Email from "../components/Routes/Email";

// Contexts used
import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";
import { CardsContextProvider as PrivateCardProvider } from "../contexts/CardsContext";

configure({ adapter: new Adapter() });

afterAll(() => {
  const originalError = console.log("Ignore Context Warning");
  console.error = jest.fn();

  // test code here

  console.error = originalError;
});

describe("Components Within Router Components Sub-Directory", () => {
  it("renders Landing page route without crashing", () => {
    const landing = shallow(
      <ROUTER>
        <Landing />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(landing, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Gallery page route without crashing", () => {
    let cards = "foo";
    const gallery = shallow(
      <ROUTER>
        <UserProvider value="foo">
          <GalleryProvider value={{ cards }}>
            <Gallery />
          </GalleryProvider>
        </UserProvider>
      </ROUTER>
    );
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(gallery, div);
      ReactDOM.unmountComponentAtNode(div);
      return;
    });
  });

  it("renders User HomePage route without crashing", () => {
    const userHome = shallow(
      <UserProvider>
        <ROUTER>
          <UserHome />
        </ROUTER>
      </UserProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(userHome, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders PrivateCards -- a direct child of UserPage route -- without crashing", () => {
    const userHome = shallow(
      <UserProvider>
        <PrivateCardProvider>
          <ROUTER>
            <PrivateCards />
          </ROUTER>
        </PrivateCardProvider>
      </UserProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(userHome, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Download Page route without crashing", () => {
    const state = "foo";
    const downloadPage = shallow(
      <ThemeProvider>
        <UserProvider>
          <CardProvider>
            <ROUTER>
              <DownloadPage location={state} />
            </ROUTER>
          </CardProvider>
        </UserProvider>
      </ThemeProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(downloadPage, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Email Page route without crashing", () => {
    //   note: page is work in progress
    const state = "foo";
    const emailPage = shallow(
      <ThemeProvider>
        <UserProvider>
          <CardProvider>
            <ROUTER>
              <Email location={state} />
            </ROUTER>
          </CardProvider>
        </UserProvider>
      </ThemeProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(emailPage, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Guide route without crashing", () => {
    const guide = shallow(
      <ROUTER>
        <Guide />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(guide, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders FAQs route without crashing", () => {
    const faqs = shallow(
      <ROUTER>
        <FAQs />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(faqs, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Public Card route without crashing", () => {
    const state = "foo";
    const publicCard = shallow(
      <UserProvider>
        <PubCardProvider>
          <ROUTER>
            <PublicCard location={state} />
          </ROUTER>
        </PubCardProvider>
      </UserProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(publicCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Private Card Route without crashing", () => {
    const state = "foo";
    const publicCard = shallow(
      <UserProvider>
        <CardProvider>
          <ROUTER>
            <PrivateCard location={state} />
          </ROUTER>
        </CardProvider>
      </UserProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(publicCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Login Page without crashing", () => {
    const login = shallow(
      <ROUTER>
        <Login />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(login, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Registration Page route without crashing", () => {
    const registration = shallow(
      <ROUTER>
        <Registration />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(registration, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
