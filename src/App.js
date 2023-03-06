import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLInkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ColorRecognition from './Components/ColorRecognition/ColorRecognition';
import ParticlesBg from 'particles-bg';

function App() {
    const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } );
  const [input, setInput] = useState(() => {    
    const saved = localStorage.getItem("input");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [imageUrl, setImageUrl] = useState('');
  const[box, setBox] = useState([]);
  const [isSignedIn, setIsSignIn] = useState(false);
  const [route, setRoute] = useState('signin');
  const [module, setModule] = useState({
    id: 'color-recognition',
    name: 'colors'
  });
  const [imageColors, setImageColors] = useState("")
  const [myBackgroundColor, setBackgroundColor] = useState("#ffa500");

  document.body.style.backgroundColor = myBackgroundColor;

  const serverUrl = "https://ai-brain-server.onrender.com"
  const location = useLocation()
  
  useEffect(() => {
    if (location.pathname === "/facerecognition" || location.pathname === "/register") 
            setBackgroundColor("#5E2CA5")
        }, [location.pathname]);

  useEffect(() => {
   if (location.pathname != "/facerecognition" && location.pathname != "/register") 
     setBackgroundColor('#FFB700')
   }, [location.pathname]);

   useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);
   
    const loadUser = (data) => {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      })
    }

    const changeModule = (newModule) => {     
      if (newModule != "face-detection") {
        setModule({
          id: "color-recognition",
          name: "colors"
        })
        setBox([])
      } else {
        setModule({
          id: "face-detection",
          name: 'faces'
        })
      }
      console.log(module)
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
      console.log("loc array", locationsArray)
      return locationsArray      
    };

    const displayFaceBox = (box) => {
      setBox(box);
    };

    const prepareColorsArray = (data) => {
      let colorsArray = [];
      let cleaned_data = data.outputs[0].data
      console.log(cleaned_data)
       cleaned_data.colors.forEach((item) => {
        colorsArray.push(item)       
      })
      console.log("col array", colorsArray) 
      let sortedColorsArray = colorsArray.sort((a, b) => b.value - a.value)
      console.log("sorted col array", sortedColorsArray)
      return sortedColorsArray      
    };

    const displayColorSwatch = (colorSwatch) => {
      console.log(colorSwatch[0].raw_hex)
      setImageColors(colorSwatch[0].raw_hex)
      return imageColors      
    }

   const onInputChange = (event) => {
      setInput(event.target.value);
    };

    const onSubmit = () => {
      setImageUrl(input);      
      fetch(`${serverUrl}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: input,
          module: module
        })
      })
      .then(response => response.json())                
      .then(response => {
        if (response) {
          fetch(`${serverUrl}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {               
              setUser({
                id: user.id,
                name: user.name,
                email: user.email,
                entries: count,
                joined: user.joined

              });
            })
            .catch(console.log)

        }
        if (module.id === "face-detection") {
          displayFaceBox(calculateFaceLocation(prepareLocationsArray(response)
          ))} else {
            displayColorSwatch(prepareColorsArray(response))      
            console.log("cudne", response)            
          }

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
      <div className="App" >        
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} changeModule={changeModule} setBackgroundColor={setBackgroundColor} setInput={setInput}/>
        <Routes>
              <Route path="/" element={<SignIn loadUser={loadUser} onRouteChange={onRouteChange} serverUrl={serverUrl}/>} />              
              <Route path="/signin" element={<SignIn loadUser={loadUser} onRouteChange={onRouteChange} serverUrl={serverUrl}/>} />
              <Route path="/register" element={<Register loadUser={loadUser} onRouteChange={onRouteChange} serverUrl={serverUrl}/>} />
              <Route path="/colorrecognition" element={<ColorRecognition imageUrl={imageUrl} module={module} imageColors={imageColors} 
                user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input}/>} />
              <Route path="/facerecognition" element={<FaceRecognition box={box} imageUrl={imageUrl} module={module} imageColors={imageColors} 
                user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input}/>}/>            
          </Routes>

        {/* <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} changeModule={changeModule}/>
        { route === 'home' 
        ? <div>            
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module}/>
            <FaceRecognition box={box} imageUrl={imageUrl} module={module} imageColors={imageColors}/>
        </div>
        : (
          route === "signin"
          ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} serverUrl={serverUrl}/> 
          : <Register loadUser={loadUser} onRouteChange={onRouteChange} serverUrl={serverUrl}/> 
        )
        
        } */}
      </div>       
      );
    }
    ;

    export default App;
