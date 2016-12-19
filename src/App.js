import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import THREE from 'three';
const THREE = require('three');
import DatGui from './components/DatGui';

import data from './data/raisedTea';
import CupStore from './stores/CupStore';
const cupStore = new CupStore(data);

class App extends Component {
  componentDidMount() {
    console.log('THREE', THREE);
    const scaling = 0.2;
    const store = {
      bg: {
        width: 1500 * scaling,
        height: 1100 * scaling,
        // image: bgImage,
      },
    };

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize(store.bg.width, store.bg.height);
    renderer.setClearColor( 0x000000, 1 );
    // document.body.appendChild( renderer.domElement );
    this.container.appendChild( renderer.domElement );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DatGui store={cupStore} />
        <div ref={container => this.container = container} />
      </div>
    );
  }
}

export default App;
