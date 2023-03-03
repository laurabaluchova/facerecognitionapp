import React, { useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

function  SignIn ({loadUser, onRouteChange, serverUrl}) {
  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const navigate = useNavigate()

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value)
  }

const onSubmitSignIn = (event) => {
  fetch(`${serverUrl}/signin`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        loadUser(user);
        onRouteChange('home');
        navigate("/colorrecognition")
    }
  })  
}
  return (    
    <article className="br5 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
    <main className="pa4 white">
        <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange}
                    className="pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" 
                    type="email" 
                    name="email-address" 
                    id="email-address" />
                </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={onPasswordChange} 
        className="b pa2 input-reset white ba bg-transparent hover-bg-white hover-black w-100" 
        type="password" 
        name="password"  
        id="password" />
      </div>      
    </fieldset>
    <div className="">
      <input onClick={onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" type="submit" value="Sign in" />
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('register')} className="f6 link dim white db underline pointer">Register</p>      
    </div>
  </div>
</main>
</ article>        
  );
  }
export default SignIn;