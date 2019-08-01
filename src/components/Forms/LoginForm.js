import React, { useState, useRef } from "react";
import { useInput } from "../../hooks/input-hook";
import { AuthService } from "../../services/auth-service";
import { validateLogin } from "../../services/validation/auth-validation";
import { JtoNotification, Required } from "../Utils/Utils";
import "./css/Forms.css";

const LoginForm = (props) => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("", validateLogin);
  const { value: pwd, bind: bindPwd, reset: resetPwd } = useInput("", validateLogin);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const emailRef = useRef();
  const pwdRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResStatus(0);
    setResMsg("");
    try {
      const validLogin = await AuthService.postLogin({
        email,
        password: pwd
      });

      if (!validLogin) {
        console.log("Failed Login");
      }

      setResStatus(200);
      setResMsg("Successful Login");
      resetEmail();
      resetPwd();
      props.onLoginSuccess();
    } catch (error) {
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
    }
  };

  return (
    <form className="jto-form login-form" onSubmit={handleSubmit}>
      {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
      <fieldset>
        <label htmlFor="email">
          <Required met={email.length === 0 ? false : true} />
          Email
        </label>
        <input ref={emailRef} name="email" type="text" {...bindEmail} />
        <br />
        <label htmlFor="pwd">
          <Required met={pwd.length === 0 ? false : true} />
          Password
        </label>
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
