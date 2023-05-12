import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ColorRecognition from './Components/ColorRecognition/ColorRecognition';

function App() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });
  const [input, setInput] = useState(() => {
    const saved = localStorage.getItem("input"); 
    if (saved != "") {
      const initialValue = JSON.parse(saved);
    return initialValue || "";
    }   
    return "";    
  });
  
  const [box, setBox] = useState([]);  
  const [module, setModule] = useState({
    id: 'color-recognition',
    name: 'colors'
  });
  const [imageColors, setImageColors] = useState("");
  const [myBackgroundColor, setBackgroundColor] = useState("#ffa500");
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState('default');

  document.body.style.backgroundColor = myBackgroundColor;

  const serverUrl = "https://ai-brain-server.onrender.com"
  const location = useLocation()

  const changeCursor = () => {
    setCursor(prevState => {
      if (prevState === 'default') {
        return 'wait';
      }
      return 'default';
    });
  }

  useEffect(() => {
    if (location.pathname === "/facerecognition" || location.pathname === "/register")
      setBackgroundColor("#5E2CA5")
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/facerecognition" && location.pathname !== "/register")
      setBackgroundColor('#FFB700')
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(input));
  }, [input]);

  
  const validateUrl = URL => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    return regex.test(URL);
  };

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
    if (newModule !== "face-detection") {
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
  };

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
    
    if (input !== "" && validateUrl(input)) {
      setIsLoading(true);
      changeCursor();
      fetch(`${serverUrl}/imageurl`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
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
              headers: { 'Content-Type': 'application/json' },
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
                setIsLoading(false)
                changeCursor()
              })
              .catch(() => {
                setIsLoading(false);
                changeCursor();
                console.log()
              });

          }
          if (module.id === "face-detection") {
            displayFaceBox(calculateFaceLocation(prepareLocationsArray(response)
            ))
          } else {
            displayColorSwatch(prepareColorsArray(response))            
          }

        })
        .catch(err => console.log(err));
    } else {
      console.log("input empty")
    }
  } 

  return (
    <div className="App" style={{ cursor: cursor }}>
      <Navigation changeModule={changeModule} setInput={setInput} setIsGoogleUser={setIsGoogleUser} setIsLoading={setIsLoading} />
      <Routes>
        <Route path="/" element={<SignIn loadUser={loadUser} serverUrl={serverUrl}
          setUser={setUser} setIsGoogleUser={setIsGoogleUser} isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor}
          setCursor={setCursor} changeCursor={changeCursor} />} />
        {/* <Route path="/signin" element={<SignIn loadUser={loadUser} serverUrl={serverUrl}
          setUser={setUser} setIsGoogleUser={setIsGoogleUser} isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor}
          setCursor={setCursor} changeCursor={changeCursor} />} /> */}
        <Route path="/register" element={<Register loadUser={loadUser} serverUrl={serverUrl}
          isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor}
          setCursor={setCursor} changeCursor={changeCursor} />} />
        <Route path="/colorrecognition" element={<ColorRecognition imageUrl={input} module={module} imageColors={imageColors}
          user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input} isGoogleUser={isGoogleUser}
          isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor} setCursor={setCursor} changeCursor={changeCursor} validateUrl={validateUrl}/>} />
        <Route path="/facerecognition" element={<FaceRecognition box={box} imageUrl={input} module={module} 
          user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input} isGoogleUser={isGoogleUser}
          isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor} setCursor={setCursor} changeCursor={changeCursor} />} />
      </Routes>

    </div>
  );
}
;

export default App;
