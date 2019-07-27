import React, { useState } from "react";
import { validatePwd, validateUsername } from "../../services/validation/auth-validation";
import { useRegistrationInput } from "../../hooks/registration-hook";

const Register = () => {
  const { value: username, error, bind: bindUsername, reset: resetUsername } = useRegistrationInput(
    "",
    validateUsername
  );

  return (
    <form className="jto-form register-form">
      <fieldset>
        <ul>
          {error.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <label htmlFor="user_name">User Name:</label>
        <input type="text" name="user_name" placeholder="paper_cut-27" {...bindUsername} />
        <br />
        <label htmlFor="full_name">Full Name:</label>
        <input type="text" name="full_name" placeholder="Eric Cardman" />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" placeholder="ecardman@gmail.com" />
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" placeholder="Password1@" />
      </fieldset>
      <button type="submit">Join Our Community</button>
      {username}
    </form>
  );
};

export default Register;
