import React from "react";
// STATIC
import Nav from "../Static/Nav";
import Footer from "../Static/Footer";

// FORMS
import AddCard from "../Forms/AddCardForm";
import Register from "../Forms/Register";

// ROUTES
import Landing from "../Routes/Landing";
import PublicCards from "../Routes/PublicCards";
import { Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <header className="jto-header">
        <Nav />
      </header>
      <main className="jto-main">
        {/* create general layout, restructure components folder in forms, utils, nav, content */}
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route exact path={"/add-occasion"} component={AddCard} />
          <Route exact path={"/gallery"} component={PublicCards} />
          <Route exact path={"/authorization"} component={Register} />
        </Switch>
        <Footer />
      </main>
    </>
  );
};

export default App;
