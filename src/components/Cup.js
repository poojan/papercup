import React, { Component } from 'react';
import * as THREE from 'three';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
const loader = new THREE.TextureLoader();

const loadTexture = (img) => new Promise((resolve, reject) => {
  // console.log('loadTexture', img, typeof img);
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
  // console.log('processTexture', texture);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatU || 1, repeatV || 1);
  texture.anisotropy = 16;
  return texture;
};


const deg = rad => rad * Math.PI / 180;

@inject('uiStore', 'cupStore')
@observer
class Cup extends Component {
  @observable renderer;
  @observable bgTexture;
  @observable cupTexture;
  @observable overlayTexture;

  constructor(props) {
    super(props);

    this.onClickCup = this.onClickCup.bind(this);
    console.log('CUP CONSTRUCTOR');
  }

  componentDidMount() {
    console.log('CUP DID_MOUNT');
    // console.log('POOJAN: Cup componentDidMount');
    const { cupStore, uiStore, width, height, keyId } = this.props;
    const cStore = cupStore.findById(keyId);
    console.log('cStore', keyId, cStore);
    if (!cStore) { return; }
    // cStore.setData(data);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // const height = cStore.scene.width * window.innerHeight/window.innerWidth;
    this.renderer.setSize(width || cStore.scene.width, height || cStore.scene.height);

    this.renderer.domElement.addEventListener('mousedown', this.onClickCup, false);

    document.body.appendChild(this.renderer.domElement);

    if (!uiStore.cropped) {
      return;
    }
    // console.log('POOJAN: cropped');
    this
      .load()
      .then(() => {
        // console.log('POOJAN: loaded');
        this.renderImage(this.renderer, cStore);
      });
  }

  componentWillUnmount() {
    this.renderer.domElement.removeEventListener('mousedown', this.onClickCup);
  }

  componentWillReact() {
    // console.log('POOJAN: Cup componentWillReact');
    const { uiStore, cupStore, keyId } = this.props;
    const cStore = cupStore.findById(keyId);

    if (!this.renderer) { return; }
    this.renderImage(this.renderer, cStore);

    // console.log('POOJAN: componentWillReact');
    if (!uiStore.cropped) {
      return;
    }
    // console.log('POOJAN: cropped');
    this
      .load()
      .then(() => {
        // console.log('POOJAN: componentWillReact loaded');
        this.renderImage(this.renderer, this.props.cStore);
      });
  }

  @action load() {
    console.log('CUP load');
    const { cupStore, uiStore, keyId } = this.props;
    const cStore = cupStore.findById(keyId);
    // console.log('uiStore.cropped', uiStore.cropped);

    // if (this.cupTexture) { return Promise.resolve(); }

    console.log('cStore', keyId, cStore);

    return Promise.all([
      loadTexture(cStore.bg.image),
      // loadTexture(cStore.cup.image),
      loadTexture(uiStore.cropped),
    ])
      .then(values => {
        this.bgTexture = processTexture(values[0]);
        // console.log('bgTexture', this.bgTexture.slice && this.bgTexture.slice(0, 200));
        this.cupTexture = processTexture(values[1]);
        // this.cupTexture = this.processTexture(uiStore.cropped);
        // console.log('cupTexture', this.cupTexture.slice && this.cupTexture.slice(0, 200));

        if (cStore.bg.overlay) {
          return loadTexture(cStore.bg.overlay)
            .then(texture => {
              this.overlayTexture = texture;
            });
        }
      });
  }

  renderImage(renderer, cStore) {
    const { width, height } = this.props;

    var scene = new THREE.Scene();

    const sceneWidth = width || cStore.scene.width;
    const sceneHeight = height || cStore.scene.height;

    // console.log(window.innerWidth, window.innerHeight);
    // Camera
    var camera = new THREE.PerspectiveCamera(
      cStore.camera.fov,
      sceneWidth / sceneHeight,
      0.1,
      10000
    );
    camera.position.x = cStore.camera.posX;
    camera.position.y = cStore.camera.posY;
    camera.position.z = cStore.camera.posZ;
    camera.rotation.x = deg(cStore.camera.rotX);
    camera.rotation.y = deg(cStore.camera.rotY);
    camera.rotation.z = deg(cStore.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    var ambientLight = new THREE.AmbientLight(cStore.ambLight.color);
    scene.add(ambientLight);

    var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    lights[0] = new THREE.DirectionalLight(cStore.dirLight1.color, cStore.dirLight1.intensity);
    lights[1] = new THREE.DirectionalLight(cStore.dirLight2.color, cStore.dirLight2.intensity);

    lights[0].position.set(
      cStore.dirLight1.posX,
      cStore.dirLight1.posY,
      cStore.dirLight1.posZ
    );
    lights[1].position.set(
      cStore.dirLight2.posX,
      cStore.dirLight2.posY,
      cStore.dirLight2.posZ
    );

    scene.add(lights[0]);
    scene.add(lights[1]);

    var cupGeometry = new THREE.CylinderBufferGeometry(
      cStore.cup.radiusTop,
      cStore.cup.radiusBottom,
      cStore.cup.height,
      40, // radialSegments={40}
      5, // heightSegments={5}
      cStore.cup.openEnded // openEnded
    );

    var bgGeometry = new THREE.PlaneBufferGeometry(
      cStore.bg.width,
      cStore.bg.height
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
      opacity: cStore.cup.opacity,
    });
    var cupBgMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      opacity: cStore.cup.opacity,
    });

    const cupRotationOrder = 'XZY';
    var cupMesh = new THREE.Mesh(cupGeometry);
    cupMesh.material = cupMaterial;
    cupMesh.position.x = cStore.cup.posX;
    cupMesh.position.y = cStore.cup.posY;
    cupMesh.position.z = cStore.cup.posZ;
    cupMesh.rotation.x = deg(cStore.cup.rotX);
    cupMesh.rotation.y = deg(cStore.cup.rotY);
    cupMesh.rotation.z = deg(cStore.cup.rotZ);
    cupMesh.rotation.order = cupRotationOrder;

    var cupBgMesh = new THREE.Mesh(cupGeometry);
    cupBgMesh.material = cupBgMaterial;
    cupBgMesh.position.x = cStore.cup.posX;
    cupBgMesh.position.y = cStore.cup.posY;
    cupBgMesh.position.z = cStore.cup.posZ - 1;
    cupBgMesh.rotation.x = deg(cStore.cup.rotX);
    cupBgMesh.rotation.y = deg(cStore.cup.rotY);
    cupBgMesh.rotation.z = deg(cStore.cup.rotZ);
    cupBgMesh.rotation.order = cupRotationOrder;

    var group = new THREE.Group();
    group.position.x = cStore.grp.posX;
    group.position.y = cStore.grp.posY;
    group.position.z = cStore.grp.posZ;
    group.rotation.x = deg(cStore.grp.rotX);
    group.rotation.y = deg(cStore.grp.rotY);
    group.rotation.z = deg(cStore.grp.rotZ);

    group.add(bgPlaneMesh);
    group.add(cupBgMesh);
    group.add(cupMesh);

    if (cStore.bg.overlay) {
      var overlayGeometry = new THREE.PlaneBufferGeometry(
        cStore.bg.width,
        cStore.bg.height
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

  @action onClickCup() {
    const { onClickCup, keyId } = this.props;

    // const anim = action(() => {
      // cStore.cup.rotY += deg(30);
      // requestAnimationFrame(anim);
    // });
    // requestAnimationFrame(anim);
    onClickCup(keyId);
  }

  render() {
    // console.log('onClickCup', this.onClickCup);
    return (
      <div
        onClick={this.onClickCup}
        className="Cup"
        ref={container => this.container = container}
        data-cStore={JSON.stringify(this.props.cStore)}
        data-uiStore={this.props.uiStore.cropped}
      />
    );
  }
}

export default Cup;
