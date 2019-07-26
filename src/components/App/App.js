import React from "react";
// import Nav from "../Static/Nav";
import AddCard from "../Forms/AddCardForm";
import PublicCards from "../Routes/PublicCards";
import { Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <main className="jto-main">
      <AddCard />
      {/* create general layout, restructure components folder in forms, utils, nav, content */}
      <Switch>
        <Route exact path={"/gallery"} component={PublicCards} />
      </Switch>
    </main>
  );
};

export default App;
