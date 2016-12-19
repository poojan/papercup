import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';
// const overlayImage = 'bg/fingers.gif';
// const overlayImage = 'bg/fingers1.gif';
// const overlayImage = 'bg/fingers2.png';
const deg = rad => rad * Math.PI / 180;

@observer
class App extends Component {
  @observable renderer;

  componentDidMount() {
    // const { store } = this.props;

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

    // Camera
    var camera = new THREE.PerspectiveCamera(
      store.camera.fov,
      store.scene.width / store.scene.height,
      0.1,
      3000
    );
    camera.position.z = store.camera.posZ;

    // Lights
    var ambientLight = new THREE.AmbientLight(store.ambLight.color);
    scene.add( ambientLight );

    var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    lights[0] = new THREE.DirectionalLight(store.dirLight1.color, 1);
    lights[1] = new THREE.DirectionalLight(store.dirLight2.color, 1);

    lights[0].position.set(
      store.dirLight1.posX,
      store.dirLight1.posY,
      store.dirLight1.posZ
    );
    lights[1].position.set(
      store.dirLight2.posX,
      store.dirLight2.posY,
      store.dirLight2.posZ
    );

    scene.add(lights[0]);
    scene.add(lights[1]);

    var cupGeometry = new THREE.CylinderGeometry(
      store.cup.radiusTop,
      store.cup.radiusBottom,
      store.cup.height,
      40, // radialSegments={40}
      5, // heightSegments={5}
      store.cup.openEnded // openEnded
    );

    var bgGeometry = new THREE.PlaneBufferGeometry(
      store.bg.width,
      store.bg.height
    );

    var bgTexture = new THREE.TextureLoader().load(bgImage);
    bgTexture.wrapS = THREE.RepeatWrapping;
    bgTexture.wrapT = THREE.RepeatWrapping;
    bgTexture.repeat.set(1, 1);
    bgTexture.anisotropy = 16;

    var bgMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: bgTexture,
    });
    var bgPlaneMesh = new THREE.Mesh( bgGeometry, bgMaterial );


    var cupTexture = new THREE.TextureLoader().load(cupImage);
    cupTexture.wrapS = THREE.RepeatWrapping;
    cupTexture.wrapT = THREE.RepeatWrapping;
    cupTexture.repeat.set(1, 1);
    cupTexture.anisotropy = 16;


    var cupMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      // side: THREE.DoubleSide,
      side: THREE.FrontSide,
      map: cupTexture,
      // alphaMap: cupAlphaTexture,
      // alphaMap: cupTexture,
      // alphaMap: bg2Texture,
      transparent: true,
      depthWrite  : false
    });

    var cupMesh = new THREE.Mesh( cupGeometry );
    cupMesh.material = cupMaterial;
    cupMesh.position.x = store.cup.posX;
    cupMesh.position.y = store.cup.posY;
    cupMesh.position.z = store.cup.posZ;
    cupMesh.rotation.x = deg(store.cup.rotX);
    cupMesh.rotation.y = deg(store.cup.rotY);
    cupMesh.rotation.z = deg(store.cup.rotZ);
    scene.add(bgPlaneMesh);
    scene.add( cupMesh );

    var bg2Geometry = new THREE.PlaneBufferGeometry(
      store.bg.width,
      store.bg.height
    );

    var bg2Texture = new THREE.TextureLoader().load(overlayImage);
    bg2Texture.wrapS = THREE.RepeatWrapping;
    bg2Texture.wrapT = THREE.RepeatWrapping;
    bg2Texture.repeat.set(1, 1);
    bg2Texture.anisotropy = 16;

    var bg2Material = new THREE.MeshBasicMaterial({
      transparent: true,
      color: 0xffffff,
      // side: THREE.DoubleSide,
      side: THREE.FrontSide,
      map: bg2Texture,
      // alphaMap: bg2Texture,
      // depthWrite  : false
    });
    // var bg2PlaneMesh = new THREE.Mesh( bg2Geometry, bg2Material );
    var bg2PlaneMesh = new THREE.Mesh( bg2Geometry, bg2Material );
    bg2PlaneMesh.position.z = 0;
    scene.add(bg2PlaneMesh);













    // ----------
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
