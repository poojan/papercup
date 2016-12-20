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
    const { store } = this.props;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // const height = store.scene.width * window.innerHeight/window.innerWidth;
    this.renderer.setSize(store.scene.width, store.scene.height);
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

  processTexture(texture, repeatU, repeatV) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatU || 1, repeatV || 1);
    texture.anisotropy = 16;
    return texture;
  };

  @action load() {
    const { store } = this.props;

    return Promise.all([
      loadTexture(store.bg.image),
      loadTexture(store.cup.image),
    ])
      .then(values => {
        this.bgTexture = this.processTexture(values[0]);
        this.cupTexture = this.processTexture(values[1]);

        if (store.bg.overlay) {
          return loadTexture(store.bg.overlay)
            .then(texture => {
              this.overlayTexture = texture;
            });
        }
      });
  }

  renderImage(renderer, store) {
    var scene = new THREE.Scene();

    console.log(window.innerWidth, window.innerHeight);
    // Camera
    var camera = new THREE.PerspectiveCamera(
      store.camera.fov,
      store.scene.width / store.scene.height,
      0.1,
      10000
    );
    camera.position.x = store.camera.posX;
    camera.position.y = store.camera.posY;
    camera.position.z = store.camera.posZ;
    camera.rotation.x = deg(store.camera.rotX);
    camera.rotation.y = deg(store.camera.rotY);
    camera.rotation.z = deg(store.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    var ambientLight = new THREE.AmbientLight(store.ambLight.color);
    scene.add(ambientLight);

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

    var cupGeometry = new THREE.CylinderBufferGeometry(
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

    var bgMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: this.bgTexture,
    });
    var bgPlaneMesh = new THREE.Mesh(bgGeometry, bgMaterial);

    var cupMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      map: this.cupTexture,
      transparent: true,
      depthWrite: false,
      opacity: store.cup.opacity,
    });
    var cupBgMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      opacity: store.cup.opacity,
    });

    const cupRotationOrder = 'XZY';
    var cupMesh = new THREE.Mesh(cupGeometry);
    cupMesh.material = cupMaterial;
    cupMesh.position.x = store.cup.posX;
    cupMesh.position.y = store.cup.posY;
    cupMesh.position.z = store.cup.posZ;
    cupMesh.rotation.x = deg(store.cup.rotX);
    cupMesh.rotation.y = deg(store.cup.rotY);
    cupMesh.rotation.z = deg(store.cup.rotZ);
    cupMesh.rotation.order = cupRotationOrder;

    var cupBgMesh = new THREE.Mesh(cupGeometry);
    cupBgMesh.material = cupBgMaterial;
    cupBgMesh.position.x = store.cup.posX;
    cupBgMesh.position.y = store.cup.posY;
    cupBgMesh.position.z = store.cup.posZ - 1;
    cupBgMesh.rotation.x = deg(store.cup.rotX);
    cupBgMesh.rotation.y = deg(store.cup.rotY);
    cupBgMesh.rotation.z = deg(store.cup.rotZ);
    cupBgMesh.rotation.order = cupRotationOrder;

    var group = new THREE.Group();
    group.position.x = store.grp.posX;
    group.position.y = store.grp.posY;
    group.position.z = store.grp.posZ;
    group.rotation.x = deg(store.grp.rotX);
    group.rotation.y = deg(store.grp.rotY);
    group.rotation.z = deg(store.grp.rotZ);

    group.add(bgPlaneMesh);
    group.add(cupBgMesh);
    group.add(cupMesh);

    if (store.bg.overlay) {
      var overlayGeometry = new THREE.PlaneBufferGeometry(
        store.bg.width,
        store.bg.height
      );

      var overlayMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0xffffff,
        // side: THREE.DoubleSide,
        side: THREE.FrontSide,
        map: this.overlayTexture,
        // depthWrite  : false
      });
      var overlayPlaneMesh = new THREE.Mesh( overlayGeometry, overlayMaterial );
      overlayPlaneMesh.position.z = 0;

      group.add(overlayPlaneMesh);
    }

    scene.add(group);

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
