import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigationfol/Navigation';
import Register from '../components/Registerfol/Register';
import SignIn from '../components/SignInfol/SignIn';
import FaceDetection from '../components/FaceDetectionfol/FaceDetection';
import Logo from '../components/Logofol/Logo';
import ImageLinkForm from '../components/ImageLinkFormfol/ImageLinkForm';
import Rank from '../components/Rankfol/Rank';

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

const intialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false, 
  user: {
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
    this.state = intialState;
  }

loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => 
  {
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
      fetch('https://thawing-ridge-79109.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => {
        if(response.status === 400){
          return alert('The image URL cannot be blank. Please provide the image url');
        }
        return response.json();
      })
      .then(response => {
        if(response) {
          fetch('https://thawing-ridge-79109.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(intialState)
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
            <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
            <ImageLinkForm onInputChange = {this.onInputChange} onDetectClick = {this.onDetectClick}/>
            <FaceDetection box = {box} imageUrl = {imageUrl}/>
          </div>
          : 
          ( 
            route === 'signin'
            ?
            <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            :
            <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          ) 
        } 
      </div>
    );
  }
}

export default App;