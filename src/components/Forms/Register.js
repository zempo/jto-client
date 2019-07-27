import React, { useState } from "react";
import { validatePwd, validateUsername, validateName, validateEmail } from "../../services/validation/auth-validation";
import { useRegistrationInput } from "../../hooks/registration-hook";

const Register = () => {
  const { value: username, error: usernameError, bind: bindUsername, reset: resetUsername } = useRegistrationInput(
    "",
    validateUsername
  );
  const { value: password, error: pwdError, bind: bindPassword, reset: resetPassword } = useRegistrationInput(
    "",
    validatePwd
  );
  const { value: fullname, error: nameError, bind: bindFullname, reset: resetFullname } = useRegistrationInput(
    "",
    validateName
  );
  const { value: email, error: emailError, bind: bindEmail, reset: resetEmail } = useRegistrationInput(
    "",
    validateEmail
  );
  // const [btn, setBtn] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(username, password, fullname, email);

    resetUsername();
    resetPassword();
    resetEmail();
    resetFullname();
  };

  return (
    <form className="jto-form register-form" onSubmit={handleSubmit}>
      <fieldset>
        <ul>
          <label htmlFor="username">User Name:</label>
          {usernameError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input type="text" name="username" placeholder="paper_cut-27" {...bindUsername} />
        <br />
        <ul>
          <label htmlFor="fullname">Full Name:</label>
          {nameError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input type="text" name="fullname" placeholder="Eric Cardman" {...bindFullname} />
        <br />
        <ul>
          <label htmlFor="email">Email:</label>
          {emailError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input type="text" name="email" placeholder="ecardman@gmail.com" {...bindEmail} />
        <br />
        <ul>
          <label htmlFor="password">Password:</label>
          {pwdError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input type="text" name="password" placeholder="Password1@" {...bindPassword} />
      </fieldset>
      <button type="submit">Join Our Community</button>
    </form>
  );
};

export default Register;
