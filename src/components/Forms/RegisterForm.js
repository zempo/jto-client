import React, { useState, useEffect, useRef } from "react";
import { validatePwd, validateUsername, validateName, validateEmail } from "../../services/validation/auth-validation";
import { useRegistrationInput } from "../../hooks/registration-hook";
import { register } from '../../services/endpoints-service'
import { jtoNotification } from '../Utils/Utils'

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
  const usernameRef = useRef()
  const fullnameRef = useRef()
  const emailRef = useRef()
  const pwdRef = useRef()
  const [validReq, setValidReq] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorStatus, setErrorStatus] = useState(0);

  useEffect(() => {
    if (usernameError.length > 0 || pwdError.length > 0 || nameError.length > 0 || emailError.length > 0) {
      return setValidReq(false)
    } else {
      return setValidReq(true)
    }
  }, [usernameError, pwdError, nameError, emailError])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newUser = { password, email }
    newUser.user_name = username
    newUser.full_name = fullname

    setLoading(true)
    try {
      const createdUser = await register.post('/', newUser)
      console.log(createdUser)

      setLoading(false);
      setValidReq(false)
      resetUsername();
      resetPassword();
      resetEmail();
      resetFullname();
    } catch (error) {
      console.log(error.response)
      setLoading(false);
      setErrorStatus(error.response.status);
      setErrorMsg(Object.values(error.response.data.error));
      // to-do: conditionally render error notification for 5 seconds
    }


  };

  return (
    <form className="jto-form register-form" onSubmit={handleSubmit}>
      < jtoNotification className="error" />
      <fieldset>
        <ul>
          <label htmlFor="username">User Name:</label>
          {usernameError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input ref={usernameRef} type="text" name="username" placeholder="paper_cut-27" {...bindUsername} />
        <br />
        <ul>
          <label htmlFor="fullname">Full Name:</label>
          {nameError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input ref={fullnameRef} type="text" name="fullname" placeholder="Eric Cardman" {...bindFullname} />
        <br />
        <ul>
          <label htmlFor="email">Email:</label>
          {emailError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input ref={emailRef} type="text" name="email" placeholder="ecardman@gmail.com" {...bindEmail} />
        <br />
        <ul>
          <label htmlFor="password">Password:</label>
          {pwdError.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
        <input ref={pwdRef} type="text" name="password" placeholder="Password1@" {...bindPassword} />
      </fieldset>
      {/* validReq */}
      <button disabled={!validReq || usernameRef.current.value.length === 0 || fullnameRef.current.value.length === 0 || emailRef.current.value.length === 0 || pwdRef.current.value.length === 0} type="submit">Join Our Community</button>
      <p>{errorStatus === 0 ? null : errorStatus}</p>
      <p>{errorMsg}</p>
      {loading ? <p>Loading...</p> : null}
    </form>
  );
};

export default Register;
