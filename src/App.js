import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
const loader = new THREE.TextureLoader();

const loadTexture = (img) => new Promise((resolve, reject) => {
  loader.load(
    img,
    function onLoad(texture) {
      resolve(texture);
    },
    function onProgress(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function onError(xhr) {
      console.log('Error: ', xhr);
      reject();
    }
  )
});

const deg = rad => rad * Math.PI / 180;

@observer
class App extends Component {
  @observable renderer;
  @observable bgTexture;
  @observable cupTexture;
  @observable overlayTexture;

  componentDidMount() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this
      .load()
      .then(() => {
        this.renderImage(this.renderer, this.props.store);
      });
  }

  componentWillReact() {
    this.renderImage(this.renderer, this.props.store);
  }

  processTexture(texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
    return texture;
  };

  @action load() {
    const { store } = this.props;

    return Promise.all([
      loadTexture(store.bg.image),
      loadTexture(store.cup.image),
      loadTexture(store.bg.overlay)
    ])
      .then(values => {
        console.log(values);
        this.bgTexture = this.processTexture(values[0]);
        this.cupTexture = this.processTexture(values[1]);
        this.overlayTexture = this.processTexture(values[2]);
      });
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
    console.log(store.camera.posZ);
    camera.position.z = store.camera.posZ;
    // camera.position.z = 100;

    // Lights
    var ambientLight = new THREE.AmbientLight(store.ambLight.color);
    scene.add( ambientLight );

    var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    lights[0] = new THREE.DirectionalLight(store.dirLight1.color, store.dirLight1.intensity);
    lights[1] = new THREE.DirectionalLight(store.dirLight2.color, store.dirLight2.intensity);

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

    // var bgTexture = loader.load(bgImage);
    // bgTexture.wrapS = THREE.RepeatWrapping;
    // bgTexture.wrapT = THREE.RepeatWrapping;
    // bgTexture.repeat.set(1, 1);
    // bgTexture.anisotropy = 16;

    const bgTexture = this.bgTexture;

    var bgMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: bgTexture,
    });
    var bgPlaneMesh = new THREE.Mesh( bgGeometry, bgMaterial );


    // var cupTexture = loader.load(cupImage);
    // cupTexture.wrapS = THREE.RepeatWrapping;
    // cupTexture.wrapT = THREE.RepeatWrapping;
    // cupTexture.repeat.set(1, 1);
    // cupTexture.anisotropy = 16;


    var cupMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      // side: THREE.DoubleSide,
      side: THREE.FrontSide,
      map: this.cupTexture,
      // alphaMap: cupAlphaTexture,
      // alphaMap: cupTexture,
      // alphaMap: overlayTexture,
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

    var overlayGeometry = new THREE.PlaneBufferGeometry(
      store.bg.width,
      store.bg.height
    );

    // var overlayTexture = loader.load(overlayImage);
    // overlayTexture.wrapS = THREE.RepeatWrapping;
    // overlayTexture.wrapT = THREE.RepeatWrapping;
    // overlayTexture.repeat.set(1, 1);
    // overlayTexture.anisotropy = 16;

    var overlayMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      color: 0xffffff,
      // side: THREE.DoubleSide,
      side: THREE.FrontSide,
      map: this.overlayTexture,
      // alphaMap: overlayTexture,
      // depthWrite  : false
    });
    // var overlayPlaneMesh = new THREE.Mesh( overlayGeometry, overlayMaterial );
    var overlayPlaneMesh = new THREE.Mesh( overlayGeometry, overlayMaterial );
    overlayPlaneMesh.position.z = 0;
    scene.add(overlayPlaneMesh);













    // ----------
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // camera.position.z = 5;

    // cube.rotation.x = store.cup.rotX;
    // cube.rotation.y = store.cup.rotY;

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
