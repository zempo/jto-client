// SETUP + UTILS
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import "./App.css";

// SERVICES
import { AuthService } from "../../services/auth-service";
import IdleService from "../../services/idle-service";
import TokenService from "../../services/token-service";

// STATIC
import Nav from "../Static/Nav";
import Footer from "../Static/Footer";

// FORMS
import AddCard from "../Forms/AddCardForm";

// ROUTES
import Landing from "../Routes/Landing";
import Gallery from "../Routes/Gallery";
import PublicCard from "../Routes/PublicCard";
import UserHome from "../Routes/UserHome";
import Registration from "../Routes/Registration";
import Login from "../Routes/Login";

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();

      TokenService.queueCallbackBeforeExpiry(() => {
        AuthService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();

    this.forceUpdate();
  };

  render() {
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
            <Route exact path={"/gallery"} component={Gallery} />
            <Route exact path={"/gallery-card"} component={PublicCard} />
            <PrivateRoute exact path={"/private"} component={UserHome} />
            <PublicOnlyRoute exact path={"/login"} component={Login} />
            <PublicOnlyRoute exact path={"/register"} component={Registration} />
          </Switch>
          <Footer />
        </main>
      </>
    );
  }
}

export default App;
