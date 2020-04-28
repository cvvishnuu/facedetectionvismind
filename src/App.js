import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigationfol/Navigation';
import Register from './components/Registerfol/Register';
import SignIn from './components/SignInfol/SignIn';
import FaceDetection from './components/FaceDetectionfol/FaceDetection';
import Logo from './components/Logofol/Logo';
import ImageLinkForm from './components/ImageLinkFormfol/ImageLinkForm';
import Rank from './components/Rankfol/Rank';

const app = new Clarifai.App({
 apiKey: 'aec7195bae514651bcc54fd03c082187'
});


const particleOptions = { 
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }, 
      onclick: {
        enable: false
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) =>{
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
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDetectClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className = 'particles' params = {particleOptions}/>
        <Navigation   onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn} />
        { route === 'home' 
          ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onDetectClick = {this.onDetectClick}/>
            <FaceDetection box = {box} imageUrl = {imageUrl}/>
          </div>
          : 
          ( 
            route === 'signin'
            ?
            <SignIn onRouteChange = {this.onRouteChange} />
            :
            <Register onRouteChange = {this.onRouteChange} />
          ) 
        } 
      </div>
    );
  }
}

export default App;