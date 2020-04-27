import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigationfol/Navigation';
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
      box: {}
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
    console.log(box);
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

  render() {
    return (
    <div className="App">
      <Particles className = 'particles' params = {particleOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange = {this.onInputChange}
        onDetectClick = {this.onDetectClick}
      />
      <FaceDetection box = {this.state.box} imageUrl = {this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;