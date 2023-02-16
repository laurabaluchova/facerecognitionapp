import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLInkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';

const initialState = {
  input: '',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false, 
  user: 
  {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }  
}

class App extends Component {
  constructor() {
        super();
    this.state =  initialState}; 
    
    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
    }

    calculateFaceLocation = (data) => {      
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    };

    displayFaceBox = (box) => {
      this.setState({box: box});
    }

    onInputChange = (event) => {
      this.setState({input:event.target.value});
    };

    onSubmit = () => {
      this.setState({imageUrl: this.state.input});
      fetch('https://ai-brain-server.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ai-brain-server.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
        if (route === 'signout') {
          this.setState(initialState)
        } else if (route === 'home') {
          this.setState({isSignedIn: true})
        }
        this.setState({route: route});
      }

    render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg num={180} type="cobweb" bg={true} color="#CDD9EB" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? <div>            
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
          route === "signin"
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        )
        
        }
      </div>
    )}};

    export default App;
