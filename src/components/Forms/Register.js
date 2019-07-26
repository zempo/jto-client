import React from "react";
import { useInput } from "../../hooks/input-hook";

const Register = () => {
  return (
    <form className="jto-form register-form">
      <fieldset>
        <lable for="user_name">User Name:</lable>
        <input type="text" name="user_name" placeholder="username" />
        <lable for="full_name">Full Name:</lable>
        <input type="text" name="full_name" placeholder="username" />
      </fieldset>
    </form>
  );
};

export default Register;
