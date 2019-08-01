import React, { useState, useEffect, useRef } from "react";
import { validatePwd, validateUsername, validateName, validateEmail } from "../../services/validation/auth-validation";
import { useInput } from "../../hooks/input-hook";
import { AuthService } from "../../services/auth-service";
import { JtoNotification, Required } from "../Utils/Utils";
import "./css/Forms.css";

const Register = (props) => {
  const { value: username, error: usrError, bind: bindUsername, reset: resetUsername } = useInput("", validateUsername);
  const { value: password, error: pwdError, bind: bindPassword, reset: resetPassword } = useInput("", validatePwd);
  const { value: fullname, error: nameError, bind: bindFullname, reset: resetFullname } = useInput("", validateName);
  const { value: email, error: emailError, bind: bindEmail, reset: resetEmail } = useInput("", validateEmail);
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const [validReq, setValidReq] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  useEffect(() => {
    if (usrError.length > 0 || pwdError.length > 0 || nameError.length > 0 || emailError.length > 0) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [usrError, pwdError, nameError, emailError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newUser = { password, email };
    newUser.user_name = username;
    newUser.full_name = fullname;

    setResStatus(0);
    setResMsg("");
    try {
      const createdUser = await AuthService.postUser(newUser);
      console.log(createdUser);

      setResStatus(createdUser.status);
      setResMsg("Account Sucessfully Created!");
      setValidReq(false);
      resetUsername();
      resetPassword();
      resetEmail();
      resetFullname();
      props.onRegistrationSuccess();
    } catch (error) {
      // console.log(errorStatus);
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
      // to-do: conditionally render error notification for 5 seconds
    }
  };

  return (
    <>
      <form className="jto-form register-form" onSubmit={handleSubmit}>
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
        <fieldset>
          <label htmlFor="username">
            <Required met={username.length === 0 ? false : true} />
            User Name:
          </label>
          <ul>
            {usrError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <input ref={usernameRef} type="text" name="username" placeholder="paper_cut-27" {...bindUsername} />
          <br />
          <label htmlFor="fullname">
            <Required met={fullname.length === 0 ? false : true} />
            Full Name:
          </label>
          <ul>
            {nameError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <input ref={fullnameRef} type="text" name="fullname" placeholder="Eric Cardman" {...bindFullname} />
          <br />
          <label htmlFor="email">
            <Required met={email.length === 0 ? false : true} />
            Email:
          </label>
          <ul>
            {emailError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <input ref={emailRef} type="text" name="email" placeholder="ecardman@gmail.com" {...bindEmail} />
          <br />
          <label htmlFor="password">
            <Required met={password.length === 0 ? false : true} />
            Password:
          </label>
          <ul>
            {pwdError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <input ref={pwdRef} type="text" name="password" placeholder="Password1@" {...bindPassword} />
        </fieldset>
        {/* validReq */}
        <button
          disabled={
            !validReq ||
            usernameRef.current.value.length === 0 ||
            fullnameRef.current.value.length === 0 ||
            emailRef.current.value.length === 0 ||
            pwdRef.current.value.length === 0
          }
          type="submit"
        >
          Join Our Community
        </button>
      </form>
    </>
  );
};

Register.defaultProps = {
  onRegistrationSuccess: () => {}
};

export default Register;
