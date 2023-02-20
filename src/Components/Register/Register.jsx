import React, { useState } from 'react';

function Register({loadUser, onRouteChange}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onSubmitRegister = (event) => {
    fetch('https://ai-brain-server.onrender.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user)
          onRouteChange('home');
      }
    })  
  }      
    return (    
      <article className="br5 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
      <main className="pa4 white">
          <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                      <input 
                      onChange={onNameChange}
                      className="pa2 white input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                      type="text" 
                      name="name"  
                      id="name" />
                  </div>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                      onChange={onEmailChange}
                      className="pa2 white input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address" />
                  </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input 
          onChange={onPasswordChange}
          className="b pa2 white input-reset ba bg-transparent hover-bg-white hover-black w-100" 
          type="password" 
          name="password"  
          id="password" />
        </div>      
      </fieldset>
      <div className="">
        <input onClick={onSubmitRegister}
        className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" type="submit" value="Register" />
      </div>    
    </div>
  </main>
  </ article>        
    )
  }  

export default Register;