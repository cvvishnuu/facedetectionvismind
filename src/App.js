import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigationfol/Navigation';
import Logo from './components/Logofol/Logo';
import ImageLinkForm from './components/ImageLinkFormfol/ImageLinkForm';
import Rank from './components/Rankfol/Rank';

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
  render() {
    return (
    <div className="App">
      <Particles className = 'particles' params = {particleOptions}/>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
  }
}

export default App;
