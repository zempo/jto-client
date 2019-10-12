import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, expect } from "enzyme";

// Modals
import Modal from "../modals/Modal";
import BottomModal from "../modals/BottomModal";
import MenuModal from "../modals/MenuModal";

// App and Context
import App from "../components/App/App";
import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "../contexts/UserContext";
import { CardContextProvider as CardProvider } from "../contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";

configure({ adapter: new Adapter() });

afterAll(() => {
  const originalError = console.log("Ignore Context Warning");
  console.error = jest.fn();

  // test code here

  console.error = originalError;
});

describe("Main App", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders app -- given a context", () => {
    const app = shallow(
      <ThemeProvider>
        <GalleryProvider value="foo">
          <UserProvider>
            <CardProvider>
              <PubCardProvider>
                <App />
              </PubCardProvider>
            </CardProvider>
          </UserProvider>
        </GalleryProvider>
      </ThemeProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("3 Modal Containers", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders Modal.js", () => {
    const modal = shallow(<Modal />);
    const div = document.createElement("div");
    ReactDOM.render(modal, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Bottom.js", () => {
    const bottomModal = shallow(<BottomModal />);
    const div = document.createElement("div");
    ReactDOM.render(bottomModal, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders MenuModal.js -- given context", () => {
    const menuModal = shallow(
      <UserProvider>
        <MenuModal />
      </UserProvider>
    );
    const div = document.createElement("div");
    ReactDOM.render(menuModal, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
