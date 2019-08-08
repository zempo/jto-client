import React, { Component } from "react";
import { UserContext } from "../../contexts/UserContext";
import FrontErrImg from "../../images/front-err.svg";
import InsideErrImg from "../../images/inside-err.svg";
import "./css/Error.css";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { error: true, info: "server is down" };
  }

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    this.setState({ error, info });
  }
  render() {
    if (this.state.info) {
      return (
        <div className="error-bounds">
          <div>{this.state.error && this.state.error.toString()}</div>
          <div className="list-card-err">
            <input type="checkbox" id={`err-card-toggle-1`} className="err-card-toggle" value="selected" />
            <label className="err-card-container" htmlFor={`err-card-toggle-1`}>
              <span className="err-checkmark" />
              <div className="front-err face-err">
                <p>There seems to have been an error :(</p>
                <img src={FrontErrImg} alt="Our server appears to be down" />
              </div>
              <div className="inner-left-err face-err">
                <p>
                  We're sorry for the inconvenience this might have caused you. We'll get to work so that we can play
                  our cards right.
                </p>
              </div>
              <div className="inner-right-err face-err">
                <img src={InsideErrImg} alt="Our server appears to be down" />
              </div>
            </label>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorPage;
