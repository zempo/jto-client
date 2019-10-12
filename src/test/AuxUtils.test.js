import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
// components to test
import Nav from "../components/Static/Nav";
import Footer from "../components/Static/Footer";
import {
  // loaders, alerts, spinners
  Loader,
  SkeletonLoader,
  SkeletonLoader2,
  RevolvingWords,
  JtoNotification,
  // common semantics
  JtoSection,
  TimeStamp,
  ThemesList,
  EditThemesList,
  Required,
  CheckCard,
  Hyph,
  // menus
  MenuOption,
  ModalOption,
  DotMenuOption,
  // buttons and pagination
  AddBtn,
  BackBtn,
  PaginateCardFaces,
  PaginateCards,
  CardPages
} from "../components/Utils/Utils";

import { UserContextProvider as UserProvider } from "../contexts/UserContext";

configure({ adapter: new Adapter() });

afterAll(() => {
  const originalError = console.log("Ignore Context Warning");
  console.error = jest.fn();

  // test code here

  console.error = originalError;
});

describe("Loaders", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders Nav.js without crashing", () => {
    const nav = shallow(
      <UserProvider>
        <ROUTER>
          <Nav />
        </ROUTER>
      </UserProvider>
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
