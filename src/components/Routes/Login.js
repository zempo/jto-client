import React from "react";
import LoginForm from "../Forms/LoginForm";
import { JtoSection } from "../Utils/Utils";

const Login = (props) => {
  const handleLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  return (
    <JtoSection className="jto-page login-page">
      <h2>Login</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </JtoSection>
  );
};

Login.defaultProps = {
  location: {},
  history: {
    push: () => {}
  }
};

export default Login;