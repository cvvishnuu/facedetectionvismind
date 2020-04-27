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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDetectClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
  );
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
      <FaceDetection imageUrl = {this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
