import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import First from "../src/components/First"

class App extends Component {
  render() {
    return (
      <div style={{display:"flex", height:"100vh",  backgroundImage: "linear-gradient(to right, #C04848, #480048)"}}>
        <First/>
      </div>
    )
  }
}

export default App;
