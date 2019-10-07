import React from "react";
import RegisterForm from "../Forms/Auth/RegisterForm";
import { JtoSection } from "../Utils/Utils";

const Registration = (props) => {
  const handleRegistrationSuccess = (user) => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <JtoSection className="jto-page registration-page">
      <h1 className="animated-h1">Register</h1>
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
    </JtoSection>
  );
};

Registration.defaultProps = {
  history: {
    push: () => {}
  }
};

export default Registration;
