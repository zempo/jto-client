import React, { useState, useEffect, useRef } from "react";
import {
  validatePwd,
  validateUsername,
  validateName,
  validateEmail
} from "../../../services/validation/auth-validation";
import { useForm } from "../../../hooks/get-files";
import { AuthService } from "../../../services/auth-service";
import { JtoNotification, Required } from "../../Utils/Utils";
import "../css/Forms.css";
import "./css/Auth.css";

const Register = (props) => {
  const { values, errors, handleChange, reset } = useForm(
    { username: "", fullname: "", email: "", password: "" },
    { 1: [], 2: [], 3: [], 4: [] },
    {},
    { 1: validateUsername, 2: validateName, 3: validateEmail, 4: validatePwd }
  );
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const [validReq, setValidReq] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  useEffect(() => {
    if (errors["1"].length > 0 || errors["2"].length > 0 || errors["3"].length > 0 || errors["4"].length > 0) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, email, username, fullname } = values;
    let newUser = { password, email };
    newUser.user_name = username;
    newUser.full_name = fullname;

    setResStatus(0);
    setResMsg("");
    try {
      const createdUser = await AuthService.postUser(newUser);

      setResStatus(createdUser.status);
      setResMsg("Account Sucessfully Created!");
      setValidReq(false);
      reset();
      props.onRegistrationSuccess();
    } catch (error) {
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
      setTimeout(() => {
        setResStatus(0);
      }, 5000);
    }
  };

  return (
    <>
      <form className="jto-form register-form" onSubmit={handleSubmit} autoComplete="off">
        {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
        <fieldset>
          <ul>
            {errors["2"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor="fullname">
            <Required met={values.fullname.length === 0 ? false : true} />
            Full Name
          </label>
          <br />
          <input
            ref={fullnameRef}
            type="text"
            name="fullname"
            placeholder="Eric Cardman"
            id={2}
            value={values.fullname}
            onChange={handleChange}
          />
          <br />
          <ul>
            {errors["1"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor="username">
            <Required met={values.username.length === 0 ? false : true} />
            Username
          </label>
          <br />
          <input
            ref={usernameRef}
            type="text"
            name="username"
            placeholder="paper_cut-27"
            id={1}
            value={values.username}
            onChange={handleChange}
          />
          <br />
          <ul>
            {errors["3"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor="email">
            <Required met={values.email.length === 0 ? false : true} />
            Email
          </label>
          <br />
          <input
            ref={emailRef}
            type="text"
            name="email"
            placeholder="ecardman@gmail.com"
            id={3}
            value={values.email}
            onChange={handleChange}
          />
          <br />
          <ul>
            {errors["4"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor="password">
            <Required met={values.password.length === 0 ? false : true} />
            Password
          </label>
          <br />
          <input
            ref={pwdRef}
            type="text"
            name="password"
            placeholder="Password1@"
            id={4}
            value={values.password}
            onChange={handleChange}
          />
        </fieldset>
        {/* validReq */}
        <button
          className="action"
          disabled={
            !validReq ||
            usernameRef.current.value.length === 0 ||
            fullnameRef.current.value.length === 0 ||
            emailRef.current.value.length === 0 ||
            pwdRef.current.value.length === 0
          }
          type="submit"
        >
          Create Occasions
        </button>
      </form>
    </>
  );
};

Register.defaultProps = {
  onRegistrationSuccess: () => {}
};

export default Register;
