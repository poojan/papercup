import React, { Component } from 'react';
import * as THREE from 'three';
import { observer, inject } from 'mobx-react';
import { observable, action, toJS } from 'mobx';



const deg = rad => rad * Math.PI / 180;

@inject('uiStore', 'cupStore')
@observer
class Cup extends Component {
  @observable renderer;
  @observable bgTexture;
  @observable cupTexture;
  @observable overlayTexture;
  @observable cupData;

  constructor(props) {
    super(props);

    this.onClickCup = this.onClickCup.bind(this);
    console.log('CUP CONSTRUCTOR');
  }

  componentDidMount() {
    console.log('CUP DID_MOUNT');
    // console.log('POOJAN: Cup componentDidMount');
    const { cupStore, uiStore, width, height, keyId, containerId } = this.props;
    this.cupData = cupStore.findById(keyId);
    console.log('cupData', keyId, this.cupData);
    if (!this.cupData) { return; }
    // cupData.setData(data);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // const height = cupData.scene.width * window.innerHeight/window.innerWidth;
    this.renderer.setSize(width || this.cupData.scene.width, height || this.cupData.scene.height);

    this.renderer.domElement.addEventListener('mousedown', this.onClickCup, false);

    document.getElementById(containerId).appendChild(this.renderer.domElement);

    if (!uiStore.devMode && !uiStore.cropped) { return; }
    // console.log('POOJAN: cropped');
    this.cupData.load()
      .then(() => this.cupData.loadCupTexture(uiStore.cropped))
    // this
      // .load()
      // .then(cupData.loadCupTexture)
      .then(() => {
        // console.log('POOJAN: loaded');
        this.renderImage(this.renderer, this.cupData);
      });
  }

  componentWillUnmount() {
    this.renderer.domElement.removeEventListener('mousedown', this.onClickCup);
  }

  componentWillReact() {
    // console.log('POOJAN: Cup componentWillReact');
    const { uiStore, cupStore, keyId } = this.props;
    this.cupData = cupStore.findById(keyId);
    // console.log('willReact', this.cupData.cup.rotY);

    if (!this.renderer) { return; }
    // this.renderImage(this.renderer, this.cupData);

    // console.log('POOJAN: componentWillReact');
    if (!uiStore.devMode && !uiStore.cropped) {
      return;
    }
    // console.log('POOJAN: cropped');
    this.cupData
      .load()
      // .then(() => cupData.loadCupTexture(uiStore.cropped))
      .then(() => {
        // console.log('POOJAN: componentWillReact loaded');
        this.renderImage(this.renderer, this.cupData);
      });
  }

  scene;
  camera;
  ambientLight;
  lights = [];
  cupGeometry;
  bgGeometry;
  bgMaterial;
  cupMaterial;
  cupBgMaterial;
  cupBgMesh;
  group
  overlayGeometry
  overlayMaterial
  overlayPlaneMesh

  renderImage(renderer, cupData) {
    const { width, height } = this.props;

    this.scene = new THREE.Scene();

    const sceneWidth = width || cupData.scene.width;
    const sceneHeight = height || cupData.scene.height;

    // console.log(window.innerWidth, window.innerHeight);
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      cupData.camera.fov,
      sceneWidth / sceneHeight,
      0.1,
      10000
    );
    this.camera.position.x = cupData.camera.posX;
    this.camera.position.y = cupData.camera.posY;
    this.camera.position.z = cupData.camera.posZ;
    this.camera.rotation.x = deg(cupData.camera.rotX);
    this.camera.rotation.y = deg(cupData.camera.rotY);
    this.camera.rotation.z = deg(cupData.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    this.ambientLight = new THREE.AmbientLight(cupData.ambLight.color);
    this.scene.add(this.ambientLight);

    // var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    this.lights[0] = new THREE.DirectionalLight(cupData.dirLight1.color, cupData.dirLight1.intensity);
    this.lights[1] = new THREE.DirectionalLight(cupData.dirLight2.color, cupData.dirLight2.intensity);

    this.lights[0].position.set(
      cupData.dirLight1.posX,
      cupData.dirLight1.posY,
      cupData.dirLight1.posZ
    );
    this.lights[1].position.set(
      cupData.dirLight2.posX,
      cupData.dirLight2.posY,
      cupData.dirLight2.posZ
    );

    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);

    this.cupGeometry = new THREE.CylinderBufferGeometry(
      cupData.cup.radiusTop,
      cupData.cup.radiusBottom,
      cupData.cup.height,
      40, // radialSegments={40}
      5, // heightSegments={5}
      cupData.cup.openEnded // openEnded
    );

    this.bgGeometry = new THREE.PlaneBufferGeometry(
      cupData.bg.width,
      cupData.bg.height
    );

    this.bgMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: cupData.bgTexture,
    });
    this.bgPlaneMesh = new THREE.Mesh(this.bgGeometry, this.bgMaterial);

    this.cupMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      map: cupData.cupTexture,
      transparent: true,
      depthWrite: false,
      opacity: cupData.cup.opacity,
    });
    this.cupBgMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      opacity: cupData.cup.opacity,
    });

    const cupRotationOrder = 'XZY';
    this.cupMesh = new THREE.Mesh(this.cupGeometry);
    this.cupMesh.material = this.cupMaterial;
    this.cupMesh.position.x = cupData.cup.posX;
    this.cupMesh.position.y = cupData.cup.posY;
    this.cupMesh.position.z = cupData.cup.posZ;
    this.cupMesh.rotation.x = deg(cupData.cup.rotX);
    this.cupMesh.rotation.y = deg(cupData.cup.rotY);
    this.cupMesh.rotation.z = deg(cupData.cup.rotZ);
    this.cupMesh.rotation.order = cupRotationOrder;

    this.cupBgMesh = new THREE.Mesh(this.cupGeometry);
    this.cupBgMesh.material = this.cupBgMaterial;
    this.cupBgMesh.position.x = cupData.cup.posX;
    this.cupBgMesh.position.y = cupData.cup.posY;
    this.cupBgMesh.position.z = cupData.cup.posZ - 1;
    this.cupBgMesh.rotation.x = deg(cupData.cup.rotX);
    this.cupBgMesh.rotation.y = deg(cupData.cup.rotY);
    this.cupBgMesh.rotation.z = deg(cupData.cup.rotZ);
    this.cupBgMesh.rotation.order = cupRotationOrder;

    this.group = new THREE.Group();
    this.group.position.x = cupData.grp.posX;
    this.group.position.y = cupData.grp.posY;
    this.group.position.z = cupData.grp.posZ;
    this.group.rotation.x = deg(cupData.grp.rotX);
    this.group.rotation.y = deg(cupData.grp.rotY);
    this.group.rotation.z = deg(cupData.grp.rotZ);

    this.group.add(this.bgPlaneMesh);
    this.group.add(this.cupBgMesh);
    this.group.add(this.cupMesh);

    if (cupData.bg.overlay) {
      this.overlayGeometry = new THREE.PlaneBufferGeometry(
        cupData.bg.width,
        cupData.bg.height
      );

      this.overlayMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0xffffff,
        // side: THREE.DoubleSide,
        side: THREE.FrontSide,
        map: cupData.overlayTexture,
        // depthWrite  : false
      });
      this.overlayPlaneMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
      this.overlayPlaneMesh.position.z = 0;

      this.group.add(this.overlayPlaneMesh);
    }

    this.scene.add(this.group);

    renderer.render(this.scene, this.camera);

    // cupGeometry.dispose();
    // bgGeometry.dispose();
    // bgMaterial.dispose();
    // cupMaterial.dispose();
    // cupBgMaterial.dispose();

    // bgPlaneMesh.dispose();
    // cupMesh.dispose();
    // cupBgMesh.dispose();
    // group.dispose();
  }

  @action onClickCup() {
    const { onClickCup, keyId } = this.props;
    // console.log('onClickCup', keyId);

    // const anim = action(() => {
      // cupData.cup.rotY += deg(30);
      // requestAnimationFrame(anim);
    // });
    // requestAnimationFrame(anim);
    onClickCup(keyId);
  }

  render() {
    // console.log('xx', this.cupData);
    // console.log('xx', JSON.stringify(this.cupData));
    // console.log('onClickCup', this.onClickCup);
    return (
      <div
        onClick={this.onClickCup}
        className="Cup"
        id={this.props.containerId}
        ref={container => this.container = container}
        data-cupData={toJS(this.cupData)}
        data-uiStore={this.props.uiStore.cropped}
      />
    );
  }
}

export default Cup;
