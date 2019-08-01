import React, { useEffect, useState, useRef } from "react";
import { useInput } from "../../hooks/input-hook";
import { AuthService } from "../../services/auth-service";
import { validateLogin } from "../../services/validation/auth-validation";
import { JtoNotification, Required } from "../Utils/Utils";
import "./css/Forms.css";

const LoginForm = (props) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("", validateLogin);
  const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("", validateLogin);
  const [error, setError] = useState(null);
  const emailRef = useRef();
  const pwdRef = useRef();

  //   useEffect(() => {

  //   }, [email, pwd])

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, pwd);
    resetEmail();
    resetPwd();
    props.onLoginSuccess();
  };

  return (
    <form className="jto-form login-form" onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} name="email" type="text" {...bindEmail} />
        <br />
        <label htmlFor="pwd">Password</label>
        <input ref={pwdRef} name="pwd" type="text" {...bindPwd} />
      </fieldset>
      <button disabled={email.length === 0 || pwd.length === 0}>Login</button>
    </form>
  );
};

LoginForm.defaultProps = {
  onLoginSuccess: () => {}
};

export default LoginForm;
