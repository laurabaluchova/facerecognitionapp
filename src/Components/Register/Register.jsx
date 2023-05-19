import { useFormik } from 'formik';
import ParticlesBg from 'particles-bg';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = ''
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

function Register({loadUser, serverUrl, isLoading, setIsLoading, cursor, setCursor, setIsGoogleUser}) { 
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (event) => {  
      if (password !== "" && name !== "") {
        setIsLoading(true);
        setIsGoogleUser(false);
        localStorage.setItem("isGoogleUser", false)
        setCursor("wait");    
      fetch(`${serverUrl}/register`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formik.values.email,
          password: password,
          name: name,
        })
      })
      .then(response => 
        {if (response.status === 400) {
          setIsLoading(false);
          console.log("registration does not work")
          setCursor("default");
        }
          return response.json()})
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
  })    

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const onNameChange = (event) => {
    setName(event.target.value)
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
                      className="pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100" 
                      type="text" 
                      name="name"  
                      id="name" />
                  </div>
                  <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                      onChange={formik.handleChange} value={formik.values.email}                     
                      className="pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100" 
                      type="email" 
                      name="email"  
                      id="email-address" />  
                       {formik.touched.email && formik.errors.email && (
                         <p className='gold f6 mt1 normal'>{formik.errors.email}</p>
                        )}                    
                  </div>                  
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input 
          onChange={onPasswordChange}
          className="b pa2 purple input-reset ba bg-white hover-bg-gold hover-purple w-100" 
          type="password" 
          name="password"  
          id="password" />
        </div>      
      </fieldset>
      <div className="">
        <input
        onClick={formik.handleSubmit}
        className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white bw2 hover-bg-gold" type="submit" value={isLoading ? "Loading..." : "Register" }
        style={{ cursor: cursor }} />
      </div>    
    </div>
  </main>
  </ article>        
    )
  }  

export default Register;