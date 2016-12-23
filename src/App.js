import React, { Component } from 'react';
import './App.css';
import * as THREE from 'three';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
const loader = new THREE.TextureLoader();

const loadTexture = (img) => new Promise((resolve, reject) => {
  console.log('loadTexture', img, typeof img);
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

const processTexture = (texture, repeatU, repeatV) => {
  console.log('processTexture', texture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatU || 1, repeatV || 1);
  texture.anisotropy = 16;
  return texture;
};


const deg = rad => rad * Math.PI / 180;

@inject('uiStore', 'cupStore')
@observer
class App extends Component {
  @observable renderer;
  @observable bgTexture;
  @observable cupTexture;
  @observable overlayTexture;

  componentDidMount() {
    console.log('POOJAN: App componentDidMount');
    const { cupStore, uiStore } = this.props;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // const height = cupStore.scene.width * window.innerHeight/window.innerWidth;
    this.renderer.setSize(cupStore.scene.width, cupStore.scene.height);
    document.body.appendChild(this.renderer.domElement);

    if (!uiStore.cropped) {
      return;
    }
    console.log('POOJAN: cropped');
    this
      .load()
      .then(() => {
        console.log('POOJAN: loaded');
        this.renderImage(this.renderer, this.props.cupStore);
      });
  }

  componentWillReact() {
    console.log('POOJAN: App componentWillReact');
    const { uiStore } = this.props;

    this.renderImage(this.renderer, this.props.cupStore);

    console.log('POOJAN: componentWillReact');
    if (!uiStore.cropped) {
      return;
    }
    console.log('POOJAN: cropped');
    this
      .load()
      .then(() => {
        console.log('POOJAN: componentWillReact loaded');
        this.renderImage(this.renderer, this.props.cupStore);
      });
  }

  @action load() {
    console.log('POOJAN: load');
    const { cupStore, uiStore } = this.props;
    // console.log('uiStore.cropped', uiStore.cropped);

    return Promise.all([
      loadTexture(cupStore.bg.image),
      // loadTexture(cupStore.cup.image),
      loadTexture(uiStore.cropped),
    ])
      .then(values => {
        this.bgTexture = processTexture(values[0]);
        // console.log('bgTexture', this.bgTexture.slice && this.bgTexture.slice(0, 200));
        this.cupTexture = processTexture(values[1]);
        // this.cupTexture = this.processTexture(uiStore.cropped);
        // console.log('cupTexture', this.cupTexture.slice && this.cupTexture.slice(0, 200));

        if (cupStore.bg.overlay) {
          return loadTexture(cupStore.bg.overlay)
            .then(texture => {
              this.overlayTexture = texture;
            });
        }
      });
  }

  renderImage(renderer, cupStore) {
    var scene = new THREE.Scene();

    console.log(window.innerWidth, window.innerHeight);
    // Camera
    var camera = new THREE.PerspectiveCamera(
      cupStore.camera.fov,
      cupStore.scene.width / cupStore.scene.height,
      0.1,
      10000
    );
    camera.position.x = cupStore.camera.posX;
    camera.position.y = cupStore.camera.posY;
    camera.position.z = cupStore.camera.posZ;
    camera.rotation.x = deg(cupStore.camera.rotX);
    camera.rotation.y = deg(cupStore.camera.rotY);
    camera.rotation.z = deg(cupStore.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    var ambientLight = new THREE.AmbientLight(cupStore.ambLight.color);
    scene.add(ambientLight);

    var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    lights[0] = new THREE.DirectionalLight(cupStore.dirLight1.color, cupStore.dirLight1.intensity);
    lights[1] = new THREE.DirectionalLight(cupStore.dirLight2.color, cupStore.dirLight2.intensity);

    lights[0].position.set(
      cupStore.dirLight1.posX,
      cupStore.dirLight1.posY,
      cupStore.dirLight1.posZ
    );
    lights[1].position.set(
      cupStore.dirLight2.posX,
      cupStore.dirLight2.posY,
      cupStore.dirLight2.posZ
    );

    scene.add(lights[0]);
    scene.add(lights[1]);

    var cupGeometry = new THREE.CylinderBufferGeometry(
      cupStore.cup.radiusTop,
      cupStore.cup.radiusBottom,
      cupStore.cup.height,
      40, // radialSegments={40}
      5, // heightSegments={5}
      cupStore.cup.openEnded // openEnded
    );

    var bgGeometry = new THREE.PlaneBufferGeometry(
      cupStore.bg.width,
      cupStore.bg.height
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
      opacity: cupStore.cup.opacity,
    });
    var cupBgMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      opacity: cupStore.cup.opacity,
    });

    const cupRotationOrder = 'XZY';
    var cupMesh = new THREE.Mesh(cupGeometry);
    cupMesh.material = cupMaterial;
    cupMesh.position.x = cupStore.cup.posX;
    cupMesh.position.y = cupStore.cup.posY;
    cupMesh.position.z = cupStore.cup.posZ;
    cupMesh.rotation.x = deg(cupStore.cup.rotX);
    cupMesh.rotation.y = deg(cupStore.cup.rotY);
    cupMesh.rotation.z = deg(cupStore.cup.rotZ);
    cupMesh.rotation.order = cupRotationOrder;

    var cupBgMesh = new THREE.Mesh(cupGeometry);
    cupBgMesh.material = cupBgMaterial;
    cupBgMesh.position.x = cupStore.cup.posX;
    cupBgMesh.position.y = cupStore.cup.posY;
    cupBgMesh.position.z = cupStore.cup.posZ - 1;
    cupBgMesh.rotation.x = deg(cupStore.cup.rotX);
    cupBgMesh.rotation.y = deg(cupStore.cup.rotY);
    cupBgMesh.rotation.z = deg(cupStore.cup.rotZ);
    cupBgMesh.rotation.order = cupRotationOrder;

    var group = new THREE.Group();
    group.position.x = cupStore.grp.posX;
    group.position.y = cupStore.grp.posY;
    group.position.z = cupStore.grp.posZ;
    group.rotation.x = deg(cupStore.grp.rotX);
    group.rotation.y = deg(cupStore.grp.rotY);
    group.rotation.z = deg(cupStore.grp.rotZ);

    group.add(bgPlaneMesh);
    group.add(cupBgMesh);
    group.add(cupMesh);

    if (cupStore.bg.overlay) {
      var overlayGeometry = new THREE.PlaneBufferGeometry(
        cupStore.bg.width,
        cupStore.bg.height
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
    console.log('this.props.uiStore.cropped');
    console.log(this.props.uiStore.cropped);
    return (
      <div
        ref={container => this.container = container}
        data-cupStore={JSON.stringify(this.props.cupStore)}
        data-uiStore={this.props.uiStore.cropped}
      />
    );
  }
}

export default App;
