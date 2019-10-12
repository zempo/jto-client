import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components to test
import Register from "../components/Forms/Auth/RegisterForm";
import LoginForm from "../components/Forms/Auth/LoginForm";
import AddCard from "../components/Forms/Card/AddCardForm";
import DeleteCard from "../components/Forms/Card/DeleteCard";
import DeleteUserCard from "../components/Forms/Card/DeleteUserCard";
import EditPublicCard from "../components/Forms/Card/EditPublicCard";
import EditCard from "../components/Forms/Card/EditCard";
import MakePublic from "../components/Forms/Card/MakePublic";
import MakePrivate from "../components/Forms/Card/MakePrivate";

// Contexts used
// import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
// import { UserContextProvider as UserProvider } from "../contexts/UserContext";
// import { CardContextProvider as CardProvider } from "../contexts/CardContext";
// import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";
import { CardsContextProvider as AllCardsProvider } from "../contexts/CardsContext";

configure({ adapter: new Adapter() });

afterEach(() => {
  const originalError = console.log("Ignore Context Warning");
  console.error = jest.fn();

  // test code here

  console.error = originalError;
});

describe("Authentication Forms", () => {
  it("renders Registration Form without crashing", () => {
    const registerForm = shallow(<Register />);

    const div = document.createElement("div");
    ReactDOM.render(registerForm, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Registration Form without crashing", () => {
    const loginForm = shallow(<LoginForm />);

    const div = document.createElement("div");
    ReactDOM.render(loginForm, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Card Forms", () => {
  it("renders AddCardForm without crashing", () => {
    const addCard = shallow(
      <AllCardsProvider>
        <AddCard />
      </AllCardsProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(addCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Admin DeleteCard Form without crashing", () => {
    const deleteCard = shallow(<DeleteCard />);

    const div = document.createElement("div");
    ReactDOM.render(deleteCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders User DeleteCard Form without crashing", () => {
    const deleteUserCard = shallow(<DeleteUserCard />);

    const div = document.createElement("div");
    ReactDOM.render(deleteUserCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Admin EditCard Form without crashing", () => {
    const editCard = shallow(
      <GalleryProvider>
        <EditPublicCard />
      </GalleryProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(editCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders User EditCard Form without crashing", () => {
    const editCard = shallow(
      <AllCardsProvider>
        <EditCard />
      </AllCardsProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(editCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Publish Card Form without crashing", () => {
    const publishCard = shallow(<MakePublic />);

    const div = document.createElement("div");
    ReactDOM.render(publishCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Make Card Private Form without crashing", () => {
    const privatizeCard = shallow(<MakePrivate />);

    const div = document.createElement("div");
    ReactDOM.render(privatizeCard, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Comment Forms", () => {});

describe("Search and Download Forms", () => {});
