import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer } from 'mobx-react';

@observer
class App extends Component {
  componentDidMount() {
    this.renderImage(this.props.store);
  }

  componentWillReceiveProps(nextProps) {
    this.renderImage(nextProps.store);
  }

  renderImage(store) {
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(store.bg.width, store.bg.height);
    renderer.setClearColor( 0x000000, 1 );
    this.container.appendChild( renderer.domElement );
  }

  render() {
    return (
      <div ref={container => this.container = container} />
    );
  }
}

export default App;
