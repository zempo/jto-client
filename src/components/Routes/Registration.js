import React from "react";
import { JtoSection } from "../Utils/Utils";
import RegisterForm from "../Forms/RegisterForm";

const Registration = (props) => {
  const handleRegistrationSuccess = (user) => {
    const { history } = props;
    history.push("/login");
  };
  return (
    <JtoSection className="RegistrationPage">
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
