import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigationfol/Navigation';
import Logo from './components/Logofol/Logo';

class App extends Component {
  render() {
    return (
    <div className="App">
      <Navigation />
      <Logo />
      {/*<ImageLinkForm />
      <FaceRecognition />*/}
    </div>
  );
  }
}

export default App;
