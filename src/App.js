import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLInkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';

function App() {
    const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } );
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const[box, setBox] = useState([]);
  const [isSignedIn, setIsSignIn] = useState(false);
  const [route, setRoute] = useState('signin')
    
    const loadUser = (data) => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
    }

      const calculateFaceLocation = (locationsArray) => {          
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      let box = [];
      locationsArray.forEach((item) => {
        box.push({
          leftCol: item.left_col * width,
          topRow: item.top_row * height,
          rightCol: width - (item.right_col * width),
          bottomRow: height - (item.bottom_row * height)
        })
      })       
      return box;   
    };

    const prepareLocationsArray = (data) => {
      let locationsArray = [];
      let cleaned_data = data.outputs[0].data
      console.log(cleaned_data)
       cleaned_data.regions.forEach((item) => {
        locationsArray.push(item.region_info.bounding_box)       
      }) 
      console.log(locationsArray)
      return locationsArray      
    };

    const displayFaceBox = (box) => {
      setBox(box);
    };

    const onInputChange = (event) => {
      setInput(event.target.value);
    };

    const onSubmit = () => {
      setImageUrl(input);      
      fetch('https://ai-brain-server.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: input
        })
      })
      .then(response => response.json())                
      .then(response => {
        if (response) {
          fetch('https://ai-brain-server.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {              
              setUser({...user, [user.entries]: count});
            })
            .catch(console.log)

        }
        displayFaceBox(calculateFaceLocation(prepareLocationsArray(response)))
      })
      .catch(err => console.log(err));
  }

    const onRouteChange = (route) => {
        if (route === 'signout') {
          setIsSignIn(false)
        } else if (route === 'home') {
          setIsSignIn(true)
        }
        setRoute(route);
      }

    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#FFFFFF" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home' 
        ? <div>            
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route === "signin"
          ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/> 
          : <Register loadUser={loadUser} onRouteChange={onRouteChange}/> 
        )
        
        }
      </div>
    )};

    export default App;
