import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import './App.css';
import ColorRecognition from './Components/ColorRecognition/ColorRecognition';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import LoadingContext from './store/loading-context';

function App() {
  const [user, setUser] = useState({
    id: window.localStorage.getItem('id') || '',
    name: window.localStorage.getItem('name') || '',
    email: '',
    entries: window.localStorage.getItem('entries') || 0,
    joined: ''
  });
  const [input, setInput] = useState(() => {
    console.log("input got from loc storgae")
    const saved = localStorage.getItem("input");
    if (saved !== "") {
      const initialValue = JSON.parse(saved);
      return initialValue || "";
    }
    return "";
  });

  const [box, setBox] = useState([]);
  const [module, setModule] = useState({
    id: window.localStorage.getItem('module_id') || 'color-recognition',
    name: window.localStorage.getItem('module_name') || 'colors'
  });
  const [imageColors, setImageColors] = useState("");
  const [myBackgroundColor, setBackgroundColor] = useState("#ffa500");
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState('default');

  document.body.style.backgroundColor = myBackgroundColor;

  const serverUrl = "https://ai-brain-server.onrender.com"
  const location = useLocation();

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
    const regex = new RegExp('(https?:\/\/.*\.(?:png|jpg|jpeg))');
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
    window.localStorage.setItem('name', data.name);
    window.localStorage.setItem('entries', data.entries);
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('module_id', "color-recognition");
    window.localStorage.setItem('module_name', "colors");
  }


  const changeModule = (newModule) => {
    if (newModule !== "face-detection") {
      setModule({
        id: "color-recognition",
        name: "colors"
      })
      window.localStorage.setItem('module_name', "colors");
      window.localStorage.setItem('module_id', "color-recognition");
      setBox([])
    } else {
      setModule({
        id: "face-detection",
        name: 'faces'
      })
      window.localStorage.setItem('module_name', "faces");
      window.localStorage.setItem('module_id', "face-detection");
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
    cleaned_data.colors.forEach((item) => {
      colorsArray.push(item)
    })
    let sortedColorsArray = colorsArray.sort((a, b) => b.value - a.value)
    return sortedColorsArray
  };

  const displayColorSwatch = (colorSwatch) => {
    setImageColors(colorSwatch[0].raw_hex);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
    setImageColors("");
  };

  async function onSubmit() {

    if (input !== "" && validateUrl(input)) {
      setIsLoading(true);
      setCursor("wait");

      let response = await fetch(`${serverUrl}/imageurl`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input,
          module: module
        })
      })

      let fetchedData = await response.json();
      if (fetchedData) {
        let imageResponse = await fetch(`${serverUrl}/image`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id
          })
        })
        if (imageResponse) {
          let imageResponseData = await imageResponse.json();
          let count = await imageResponseData;
          setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            entries: count,
            joined: user.joined

          });

          window.localStorage.setItem('entries', count);
          setIsLoading(false)
          setCursor("default");
        }

        if (module.id === "face-detection") {
          displayFaceBox(calculateFaceLocation(prepareLocationsArray(fetchedData)
          ))
        } else {
          displayColorSwatch(prepareColorsArray(fetchedData))
        }
      }
    }

    else {
      console.log("incorrect image url")
    }
  };

  return (
    <div className="App" style={{ cursor: cursor }}>
      <LoadingContext.Provider value={{
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        cursor: cursor,
        setCursor: setCursor
      }}>
        <Navigation changeModule={changeModule} setInput={setInput} setUser={setUser} setModule={setModule}/>
        <Routes>
          <Route exact path="/" element={user.id === "" ? (<SignIn loadUser={loadUser} serverUrl={serverUrl}
            setUser={setUser} /> ) : ( <Navigate replace to={"colorrecognition"} /> )} />
          <Route exact path="/register" element={user.id === "" ? (<Register loadUser={loadUser} serverUrl={serverUrl} />) : ( <Navigate replace to={"colorrecognition"} /> )} />
          <Route path="/colorrecognition" element={<ColorRecognition imageUrl={input} module={module} imageColors={imageColors}
            user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input} validateUrl={validateUrl} />} />
          <Route path="/facerecognition" element={<FaceRecognition box={box} imageUrl={input} module={module}
            user={user} onInputChange={onInputChange} onSubmit={onSubmit} input={input} validateUrl={validateUrl} />} />
        </Routes>
      </LoadingContext.Provider>
    </div>
  );
}
;

export default App;
