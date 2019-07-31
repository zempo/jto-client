import React, { useEffect } from "react";
// STATIC
import Nav from "../Static/Nav";
import Footer from "../Static/Footer";

// FORMS
import AddCard from "../Forms/AddCardForm";
import RegisterForm from "../Forms/RegisterForm";

// ROUTES + Utils + Services
import "./App.css";
import Landing from "../Routes/Landing";
import PublicCards from "../Routes/PublicCards";
import { Route, Switch } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { AuthService } from "../../services/auth-service";

const App = () => {
  useEffect(() => {
    const unmount = () => {
      IdleService.unRegisterIdleResets();
      TokenService.clearCallbackBeforeExpiry();
    };

    IdleService.setIdleCallback(logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();

      TokenService.queueCallbackBeforeExpiry(() => {
        AuthService.postRefreshToken();
      });
    }

    return unmount;
  }, []);

  const logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };
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
          <Route exact path={"/register"} component={RegisterForm} />
        </Switch>
        <Footer />
      </main>
    </>
  );
};

export default App;
