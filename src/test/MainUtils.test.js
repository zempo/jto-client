import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ROUTER } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
// components to test
import PrivateRoute from "../components/Utils/Auth/PrivateRoute";
import PublicOnlyRoute from "../components/Utils/Auth/PublicOnlyRoute";
import ListCard from "../components/Utils/Card/ListCard";

// relevant contexts
// import { ThemeContextProvider as ThemeProvider } from "../contexts/ThemeContext";
// import { GalleryContextProvider as GalleryProvider } from "../contexts/GalleryContext";
import { UserContextProvider as UserProvider } from "../contexts/UserContext";
import PrivateListCard from "../components/Utils/Card/PrivateListCard";
import SearchCard from "../components/Utils/Card/SearchCard";
import PrivateSearchCard from "../components/Utils/Card/PrivateSearchCard";
// import { CardContextProvider as CardProvider } from "../contexts/CardContext";
// import { PublicCardContextProvider as PubCardProvider } from "../contexts/PublicCardContext";
// import { CardsContextProvider as AllCardsProvider } from "../contexts/CardsContext";

configure({ adapter: new Adapter() });

// afterAll(() => {
//   const originalError = console.log("Ignore Context Warning");
//   console.error = jest.fn();

//   // test code here

//   console.error = originalError;
// });

describe("Authentication Utilities", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });

  it("renders Private Route Utility without crashing", () => {
    const privateOnlyRoute = shallow(
      <ROUTER>
        <PrivateRoute />
      </ROUTER>
    );
    act(() => {
      const div = document.createElement("div");
      ReactDOM.render(privateOnlyRoute, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  it("renders PublicOnly Route Utility without crashing", () => {
    // is function, not quite component
    let publicOnlyRoute = shallow(
      <ROUTER>
        <PublicOnlyRoute />
      </ROUTER>
    );
    let exists = publicOnlyRoute.exists();

    console.log(exists);
  });
});

describe("List and Search Card Utilities", () => {
  afterEach(() => {
    const originalError = console.log("Ignore Context Warning");
    console.error = jest.fn();

    // test code here

    console.error = originalError;
  });

  it("renders List Card Utility without crashing", () => {
    const listCard = shallow(
      <ROUTER>
        <ListCard card={{}} admin="true" user_name="mike" />
      </ROUTER>
    );

    let exists = listCard.exists();

    console.log(exists);
  });

  it("renders List Card Utility without crashing", () => {
    const privateListCard = shallow(
      <ROUTER>
        <PrivateListCard card={{}} admin="true" user_name="mike" />
      </ROUTER>
    );

    let exists = privateListCard.exists();

    console.log(exists);
  });

  it("renders List Card Utility without crashing", () => {
    const searchCard = shallow(
      <ROUTER>
        <SearchCard card={{}} admin="true" user_name="mike" />
      </ROUTER>
    );

    let exists = searchCard.exists();

    console.log(exists);
  });

  it("renders List Card Utility without crashing", () => {
    const privateSearchCard = shallow(
      <UserProvider>
        <ROUTER>
          <PrivateSearchCard />
        </ROUTER>
      </UserProvider>
    );

    let exists = privateSearchCard.exists();

    console.log(exists);
  });
});
