import ParticlesBg from 'particles-bg';
import React from 'react';
import { useNavigate } from "react-router-dom";
import useInput from '../../hooks/use-input';

function Register({ loadUser, serverUrl, isLoading, setIsLoading, cursor, setCursor }) {
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    onValueChange: onEmailChange,
    onValueBlur: onEmailBlur
  } = useInput(value => value.trim() !== "" && value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  );

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    onValueChange: onPasswordChange,
    onValueBlur: onPasswordBlur
  } = useInput(value => value.trim() !== "");

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    onValueChange: onNameChange,
    onValueBlur: onNameBlur
  } = useInput(value => value.trim() !== "");

  const navigate = useNavigate();

  let formIsValid = false;

  if (emailIsValid && passwordIsValid && nameIsValid) {
    formIsValid = true;
  };

  const onSubmitRegister = (event) => {
    event.preventDefault();
    if (formIsValid) {
      setIsLoading(true);      
      localStorage.setItem("isGoogleUser", false)
      localStorage.setItem("input", "")
      setCursor("wait");
      fetch(`${serverUrl}/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        })
      })
        .then(response => {
          if (response.status === 400) {
            setIsLoading(false);
            console.log("registration does not work")
            setCursor("default");
          }
          return response.json()
        })
        .then(user => {
          if (user.id) {
            loadUser(user)

            setIsLoading(false)
            setCursor("default");
            localStorage.setItem("isLoggedIn", "1")
            navigate("/colorrecognition");
          }
        })
        .catch(() => {
          setIsLoading(false);
          setCursor("default");
        });
    } else {
      console.log("provide register credentials")
    }
  }


  return (
    <article className="br5 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center"
      style={{ cursor: cursor }}>
      <ParticlesBg type="cobweb" bg={true} color="#FFB700" />
      <main className="pa4 white">
        <div className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                onChange={onNameChange}
                onBlur={onNameBlur}
                className="pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100"
                type="text"
                name="name"
                id="name" />
              {nameHasError && <p className='gold'>Field cannot be empty</p>}
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={onEmailChange}
                onBlur={onEmailBlur}
                className="pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100"
                type="email"
                name="email"
                id="email-address" />
              {emailHasError && <p className='gold'>Provide valid email</p>}
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                onChange={onPasswordChange}
                onBlur={onPasswordBlur}
                className="b pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100"
                type="password"
                name="password"
                id="password" />
              {passwordHasError && <p className='gold'>Field cannot be empty</p>}
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white bw2 hover-bg-gold" type="submit" value={isLoading ? "Loading..." : "Register"}
              style={{ cursor: cursor }} />
          </div>
        </div>
      </main>
    </ article>
  )
}

export default Register;