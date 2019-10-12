import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";

// Components to test
import Register from "../components/Forms/Auth/RegisterForm";
import LoginForm from "../components/Forms/Auth/LoginForm";
import AddCard from "../components/Forms/Card/AddCardForm";
import Demo from "../components/Forms/Card/Demo";
import Download from "../components/Forms/Download/Download";
import DeleteCard from "../components/Forms/Card/DeleteCard";
import DeleteUserCard from "../components/Forms/Card/DeleteUserCard";
import EditPublicCard from "../components/Forms/Card/EditPublicCard";
import EditCard from "../components/Forms/Card/EditCard";
import MakePublic from "../components/Forms/Card/MakePublic";
import MakePrivate from "../components/Forms/Card/MakePrivate";
import AddComment from "../components/Forms/Social/AddComment";
import EditComment from "../components/Forms/Social/EditComment";
import DeleteComment from "../components/Forms/Social/DeleteComment";
import SearchGallery from "../components/Forms/Search/SearchGallery";
import SearchPrivateCards from "../components/Forms/Search/SearchPrivateCards";
import { ToggleReaction, PostReaction } from "../components/Forms/Social/Reaction";

// Contexts used
// import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
// import { UserContextProvider as UserProvider } from "../contexts/UserContext";
// import { CardContextProvider as CardProvider } from "../contexts/CardContext";
import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";
import { CardsContextProvider as AllCardsProvider } from "../contexts/CardsContext";

configure({ adapter: new Adapter() });

// afterEach(() => {
//   const originalError = console.log("Ignore Context Warning");
//   console.error = jest.fn();

//   // test code here

//   console.error = originalError;
// });

describe("Authentication Forms", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
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
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
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

  it("renders Demo Form without crashing", () => {
    const demoCard = shallow(
      <ROUTER>
        <Demo />
      </ROUTER>
    );

    const div = document.createElement("div");
    ReactDOM.render(demoCard, div);
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

describe("Comment Forms", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });
  it("renders User AddComment Form without crashing", () => {
    const addComment = shallow(
      <PubCardProvider>
        <AddComment />
      </PubCardProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(addComment, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders User EditComment Form without crashing", () => {
    const editComment = shallow(
      <PubCardProvider>
        <EditComment />
      </PubCardProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(editComment, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders User DeleteComment Form without crashing", () => {
    const deleteComment = shallow(
      <PubCardProvider>
        <DeleteComment />
      </PubCardProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(deleteComment, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Reaction Form", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });

  it("renders User Post Reaction 'forms' without crashing", () => {
    const postReaction = shallow(
      <PubCardProvider>
        <PostReaction />
      </PubCardProvider>
    );

    let exists = postReaction.exists();

    console.log(exists);
  });

  it("renders User Toggle Reaction 'forms' without crashing", () => {
    const toggleReaction = shallow(
      <PubCardProvider>
        <ToggleReaction />
      </PubCardProvider>
    );
    const div = document.createElement("div");
    ReactDOM.render(toggleReaction, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Search/Share Forms", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });

  it("renders Download/Copy/Email Modal without crashing", () => {
    const downloadMenu = shallow(
      <PubCardProvider>
        <Download />
      </PubCardProvider>
    );

    let exists = downloadMenu.exists();

    console.log(exists);
  });

  it("renders Gallery Search Form without crashing", () => {
    const searchGallery = shallow(
      <GalleryProvider>
        <SearchGallery />
      </GalleryProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(searchGallery, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Gallery Search Form without crashing", () => {
    const searchPrivateCards = shallow(
      <AllCardsProvider>
        <SearchPrivateCards />
      </AllCardsProvider>
    );

    const div = document.createElement("div");
    ReactDOM.render(searchPrivateCards, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
