import React from "react";
import LoginForm from "../Forms/Auth/LoginForm";
import { JtoSection } from "../Utils/Utils";

const Login = (props) => {
  const handleLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/dashboard";

    history.push({
      state: { new: true },
      pathname: "/dashboard",
    });
  };

  return (
    <JtoSection className='jto-page login-page'>
      <h1 className='animated-h1'>Login</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </JtoSection>
  );
};

Login.defaultProps = {
  location: {},
  history: {
    push: () => {},
  },
};

export default Login;
