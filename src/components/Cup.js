import React, { Component } from 'react';
import * as THREE from 'three';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';



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
    const cupData = cupStore.findById(keyId);
    console.log('cupData', keyId, cupData);
    if (!cupData) { return; }
    // cupData.setData(data);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // const height = cupData.scene.width * window.innerHeight/window.innerWidth;
    this.renderer.setSize(width || cupData.scene.width, height || cupData.scene.height);

    this.renderer.domElement.addEventListener('mousedown', this.onClickCup, false);

    document.body.appendChild(this.renderer.domElement);

    if (!uiStore.cropped) {
      return;
    }
    // console.log('POOJAN: cropped');
    cupData.load()
    // this
      // .load()
      .then(() => {
        // console.log('POOJAN: loaded');
        this.renderImage(this.renderer, cupData);
      });
  }

  componentWillUnmount() {
    this.renderer.domElement.removeEventListener('mousedown', this.onClickCup);
  }

  componentWillReact() {
    // console.log('POOJAN: Cup componentWillReact');
    const { uiStore, cupStore, keyId } = this.props;
    const cupData = cupStore.findById(keyId);

    if (!this.renderer) { return; }
    this.renderImage(this.renderer, cupData);

    // console.log('POOJAN: componentWillReact');
    if (!uiStore.cropped) {
      return;
    }
    // console.log('POOJAN: cropped');
    cupData
      .load()
      .then(() => {
        // console.log('POOJAN: componentWillReact loaded');
        this.renderImage(this.renderer, cupData);
      });
  }

  renderImage(renderer, cupData) {
    const { width, height } = this.props;

    var scene = new THREE.Scene();

    const sceneWidth = width || cupData.scene.width;
    const sceneHeight = height || cupData.scene.height;

    // console.log(window.innerWidth, window.innerHeight);
    // Camera
    var camera = new THREE.PerspectiveCamera(
      cupData.camera.fov,
      sceneWidth / sceneHeight,
      0.1,
      10000
    );
    camera.position.x = cupData.camera.posX;
    camera.position.y = cupData.camera.posY;
    camera.position.z = cupData.camera.posZ;
    camera.rotation.x = deg(cupData.camera.rotX);
    camera.rotation.y = deg(cupData.camera.rotY);
    camera.rotation.z = deg(cupData.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    var ambientLight = new THREE.AmbientLight(cupData.ambLight.color);
    scene.add(ambientLight);

    var lights = [];
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    lights[0] = new THREE.DirectionalLight(cupData.dirLight1.color, cupData.dirLight1.intensity);
    lights[1] = new THREE.DirectionalLight(cupData.dirLight2.color, cupData.dirLight2.intensity);

    lights[0].position.set(
      cupData.dirLight1.posX,
      cupData.dirLight1.posY,
      cupData.dirLight1.posZ
    );
    lights[1].position.set(
      cupData.dirLight2.posX,
      cupData.dirLight2.posY,
      cupData.dirLight2.posZ
    );

    scene.add(lights[0]);
    scene.add(lights[1]);

    var cupGeometry = new THREE.CylinderBufferGeometry(
      cupData.cup.radiusTop,
      cupData.cup.radiusBottom,
      cupData.cup.height,
      40, // radialSegments={40}
      5, // heightSegments={5}
      cupData.cup.openEnded // openEnded
    );

    var bgGeometry = new THREE.PlaneBufferGeometry(
      cupData.bg.width,
      cupData.bg.height
    );

    var bgMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: cupData.bgTexture,
    });
    var bgPlaneMesh = new THREE.Mesh(bgGeometry, bgMaterial);

    var cupMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      map: cupData.cupTexture,
      transparent: true,
      depthWrite: false,
      opacity: cupData.cup.opacity,
    });
    var cupBgMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
      opacity: cupData.cup.opacity,
    });

    const cupRotationOrder = 'XZY';
    var cupMesh = new THREE.Mesh(cupGeometry);
    cupMesh.material = cupMaterial;
    cupMesh.position.x = cupData.cup.posX;
    cupMesh.position.y = cupData.cup.posY;
    cupMesh.position.z = cupData.cup.posZ;
    cupMesh.rotation.x = deg(cupData.cup.rotX);
    cupMesh.rotation.y = deg(cupData.cup.rotY);
    cupMesh.rotation.z = deg(cupData.cup.rotZ);
    cupMesh.rotation.order = cupRotationOrder;

    var cupBgMesh = new THREE.Mesh(cupGeometry);
    cupBgMesh.material = cupBgMaterial;
    cupBgMesh.position.x = cupData.cup.posX;
    cupBgMesh.position.y = cupData.cup.posY;
    cupBgMesh.position.z = cupData.cup.posZ - 1;
    cupBgMesh.rotation.x = deg(cupData.cup.rotX);
    cupBgMesh.rotation.y = deg(cupData.cup.rotY);
    cupBgMesh.rotation.z = deg(cupData.cup.rotZ);
    cupBgMesh.rotation.order = cupRotationOrder;

    var group = new THREE.Group();
    group.position.x = cupData.grp.posX;
    group.position.y = cupData.grp.posY;
    group.position.z = cupData.grp.posZ;
    group.rotation.x = deg(cupData.grp.rotX);
    group.rotation.y = deg(cupData.grp.rotY);
    group.rotation.z = deg(cupData.grp.rotZ);

    group.add(bgPlaneMesh);
    group.add(cupBgMesh);
    group.add(cupMesh);

    if (cupData.bg.overlay) {
      var overlayGeometry = new THREE.PlaneBufferGeometry(
        cupData.bg.width,
        cupData.bg.height
      );

      var overlayMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        color: 0xffffff,
        // side: THREE.DoubleSide,
        side: THREE.FrontSide,
        map: cupData.overlayTexture,
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
      // cupData.cup.rotY += deg(30);
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
        data-cupData={JSON.stringify(this.props.cupData)}
        data-uiStore={this.props.uiStore.cropped}
      />
    );
  }
}

export default Cup;
