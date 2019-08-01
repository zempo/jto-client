import React from "react";
import RegisterForm from "../Forms/RegisterForm";
import { JtoSection } from "../Utils/Utils";

const Registration = (props) => {
  const handleRegistrationSuccess = (user) => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <JtoSection className="jto-page registration-page">
      <h2>Register</h2>
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
