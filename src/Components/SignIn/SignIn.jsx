import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import ParticlesBg from 'particles-bg';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function  SignIn ({loadUser, serverUrl, setUser, setIsGoogleUser, isLoading, setIsLoading, cursor, setCursor}) {
  
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
  if (signInEmail !== "" && signInPassword !== "") {
    setIsLoading(true);
    setIsGoogleUser(false);
    localStorage.setItem("isGoogleUser", false)
    setCursor("wait")    
    fetch(`${serverUrl}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => 
        {if (response.status === 400) {
          setIsLoading(false);
          console.log("sign in does not work")
          setCursor("default");
        }
          return response.json()})
      .then(user => {
        if (user.id) {
          loadUser(user);         
          setIsLoading(false);
          setCursor("default");          
          navigate("/colorrecognition")
      }
    })  
    .catch(() => {    
      
  });
  } else {
    console.log("please provide your credentials")
  }
}
  return (       
    <article className="br5 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center"
      style={{ cursor: cursor }}>
    <ParticlesBg type="cobweb" bg={true} color="#5E2CA5" />     
    <main className="pa4 white">
        <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange}
                    className="pa2 input-reset ba bg-white purple hover-bg-purple hover-white w-100" 
                    type="email" 
                    name="email-address" 
                    id="email-address" />
                </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={onPasswordChange} 
        className="b pa2 input-reset purple ba bg-white hover-bg-purple hover-white w-100" 
        type="password" 
        name="password"  
        id="password" />
      </div>      
    </fieldset>
    <div className="">
      <input onClick={onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--white bw2 bg-transparent grow pointer f6 dib white hover-bg-purple" type="submit" value={isLoading ? "Loading..." : "Sign in" }
      style={{ cursor: cursor }}/>
    </div>
    <div className="lh-copy mt3">
      <Link to="/register" disabled={isLoading} className="f6 link hover-purple white db pointer mb3">Register</Link>      
    </div>
    <div>
    <GoogleLogin 
            onSuccess={credentialResponse => {
              setIsGoogleUser(true);
              localStorage.setItem("isGoogleUser", true);                            
              let userDataToken = credentialResponse
              console.log(userDataToken)
              let decodedToken = jwt_decode(userDataToken.credential);              
              navigate("/colorrecognition")
              setUser({
                id: '',
                name: decodedToken.given_name,
                email: '',
                entries: "",
                joined: ''
              })
              window.localStorage.setItem('name', decodedToken.given_name);            
            }}
         
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          
          />
    </div>
  </div>
</main>
</ article>        
  );
  }
export default SignIn;