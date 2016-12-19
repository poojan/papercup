import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer } from 'mobx-react';

@observer
class App extends Component {
  componentDidMount() {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderImage(this.props.store);
  }

  componentWillReact() {
    this.renderImage(this.props.store);
  }

  renderImage(store) {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(store.bg.width, store.bg.height);
    this.renderer.setClearColor(0x000000, 1);
    this.container.appendChild(this.renderer.domElement);
  }

  render() {
    return (
      <div
        ref={container => this.container = container}
        data-store={JSON.stringify(this.props.store)}
      />
    );
  }
}

export default App;
