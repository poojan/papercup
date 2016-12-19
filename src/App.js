import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class App extends Component {
  @observable renderer;

  componentDidMount() {
    const { store } = this.props;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.renderImage(this.renderer, this.props.store);
  }

  componentWillReact() {
    this.renderImage(this.renderer, this.props.store);
  }

  renderImage(renderer, store) {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      // store.bg.width / store.bg.height,
      0.1,
      1000
    );

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    cube.rotation.x = store.cup.rotX;
    cube.rotation.y = store.cup.rotY;

    renderer.render(scene, camera);
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
