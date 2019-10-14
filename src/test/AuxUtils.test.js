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

describe("Loaders, Alerts, Spinners", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders Occasions Loader without crashing", () => {
    const loader = shallow(<Loader />);
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(loader, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("renders gallery Skeleton Loader without crashing", () => {
    const skLoader = shallow(<SkeletonLoader />);

    const div = document.createElement("div");
    ReactDOM.render(skLoader, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Skeleton Loader 2 without crashing", () => {
    const skLoader2 = shallow(<SkeletonLoader2 />);

    const div = document.createElement("div");
    ReactDOM.render(skLoader2, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Revolving Words utility without crashing", () => {
    const mockWords = ["foo", "bar", "foobuzz"];
    const revWords = shallow(<RevolvingWords words={mockWords} />);

    const div = document.createElement("div");
    ReactDOM.render(revWords, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Notification utility without crashing", () => {
    const notification = shallow(<JtoNotification />);

    const div = document.createElement("div");
    ReactDOM.render(notification, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Semantic Utilities", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders Timestamp utility without crashing", () => {
    const timestamp = shallow(<TimeStamp />);

    const div = document.createElement("div");
    ReactDOM.render(timestamp, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders ThemesList utility without crashing", () => {
    const themes1 = shallow(<ThemesList />);

    const div = document.createElement("div");
    ReactDOM.render(themes1, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders editing ThemesList utility without crashing", () => {
    const themes2 = shallow(<EditThemesList />);

    const div = document.createElement("div");
    ReactDOM.render(themes2, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders requirement utility without crashing", () => {
    const required = shallow(<Required />);

    const div = document.createElement("div");
    ReactDOM.render(required, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders check card utility without crashing", () => {
    const checkCard = shallow(<CheckCard />);

    const div = document.createElement("div");
    ReactDOM.render(checkCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Hyph utility without crashing", () => {
    const hyphen = shallow(<Hyph />);

    const div = document.createElement("div");
    ReactDOM.render(hyphen, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Menu Utilities", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders Card Menu Option utility without crashing", () => {
    const menuOption = shallow(<MenuOption />);

    let exists = menuOption.exists();

    console.log(exists);
  });

  it("renders Modal Menu Option utility without crashing", () => {
    const modalMenuOption = shallow(<ModalOption />);

    const div = document.createElement("div");
    ReactDOM.render(modalMenuOption, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Comment Menu Option utility without crashing", () => {
    const commentMenuOption = shallow(<DotMenuOption />);

    let exists = commentMenuOption.exists();

    console.log(exists);
  });
});

describe("Navigation Utilities", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders custom section without crashing", () => {
    const specialSection = shallow(<JtoSection />);

    const div = document.createElement("div");
    ReactDOM.render(specialSection, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Add Button without crashing", () => {
    const addButton = shallow(<AddBtn />);

    const div = document.createElement("div");
    ReactDOM.render(addButton, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Back Button without crashing", () => {
    const backButton = shallow(<BackBtn />);

    const div = document.createElement("div");
    ReactDOM.render(backButton, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Card Face Pagination without crashing", () => {
    const paginateViewingCard = shallow(<PaginateCardFaces />);

    const div = document.createElement("div");
    ReactDOM.render(paginateViewingCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders List Card pagination without crashing", () => {
    const paginateListCards = shallow(<PaginateCards />);

    let exists = paginateListCards.exists();

    console.log(exists);
  });

  it("renders Viewing Card Page utility without crashing", () => {
    const cardPages = shallow(<CardPages />);

    const div = document.createElement("div");
    ReactDOM.render(cardPages, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
