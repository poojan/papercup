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
  onMousedown;
  @observable dataURL;

  constructor(props) {
    super(props);
    const { onClickCup, onMousedown, keyId } = props;

    this.onClickCup = onClickCup.bind(this, keyId);
    this.renderImage = this.renderImage.bind(this);
    if (onMousedown) {
      this.onMousedown = onMousedown.bind(this, keyId);
    }
  }

  componentDidMount() {
    const { cupStore, uiStore, width, height, keyId, containerId } = this.props;
    this.cupData = cupStore.findById(keyId);
    if (!this.cupData) { return; }
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setClearColor( 0xffffff, 1);
    this.renderer.setSize(width || this.cupData.scene.width, height || this.cupData.scene.height);

    if (this.props.onMousedown) {
      this.renderer.domElement.addEventListener('mousedown', this.onMousedown, false);
    }

    document.getElementById(containerId).appendChild(this.renderer.domElement);
    if (this.props.onRenderer) {
      this.props.onRenderer(keyId, this.renderer.domElement);
    }

    if (!uiStore.devMode && !uiStore.cropped) { return; }
    this.cupData.load()
      .then(() => this.cupData.loadCupTexture(uiStore.cropped))
      .then(action(() => {
        this.renderImage(this.renderer, this.cupData);
      }));
  }

  componentWillUnmount() {
    if (this.props.onMousedown) {
      this.renderer.domElement.removeEventListener('mousedown', this.onMousedown);
    }
  }

  componentWillReact() {
    const { uiStore, cupStore, keyId } = this.props;
    this.cupData = cupStore.findById(keyId);

    if (!this.renderer) { return; }

    if (!uiStore.devMode && !uiStore.cropped) {
      return;
    }

    this.cupData
      .load()
      .then(action(() => {
        this.renderImage(this.renderer, this.cupData);
      }));
  }

  @observable scene;
  @observable camera;
  @observable ambientLight;
  @observable lights = [];
  @observable cupGeometry;
  @observable bgGeometry;
  @observable bgMaterial;
  @observable cupMaterial;
  @observable cupBgMaterial;
  @observable cupBgMesh;
  @observable group
  @observable overlayGeometry
  @observable overlayMaterial
  @observable overlayPlaneMesh


  @action renderImage(renderer, cupData) {
    if (!cupData.cupTexture) { return; }
    const { width, height } = this.props;
    const isPlaying = cupData.isPlaying;

    if (!isPlaying) {
      this.scene = new THREE.Scene();
    }

    const sceneWidth = width || cupData.scene.width;
    const sceneHeight = height || cupData.scene.height;

    // Camera
    if (!isPlaying) {
      this.camera = new THREE.PerspectiveCamera(
        cupData.camera.fov,
        sceneWidth / sceneHeight,
        0.1,
        10000
      );
    }

    this.camera.position.x = cupData.camera.posX;
    this.camera.position.y = cupData.camera.posY;
    this.camera.position.z = cupData.camera.posZ;
    this.camera.rotation.x = deg(cupData.camera.rotX);
    this.camera.rotation.y = deg(cupData.camera.rotY);
    this.camera.rotation.z = deg(cupData.camera.rotZ);
    // camera.lookAt(scene.position);

    // Lights
    if (!isPlaying) {
      this.ambientLight = new THREE.AmbientLight(cupData.ambLight.color);
      this.scene.add(this.ambientLight);
    }

    if (!this.lights) {
      this.lights = [];
    }
    // DirectionalLight( hex, intensity )
    // PointLight( color, intensity, distance, decay )
    if (!isPlaying) {
      this.lights[0] = new THREE.DirectionalLight(cupData.dirLight1.color, cupData.dirLight1.intensity);
    }
    if (!isPlaying) {
      this.lights[1] = new THREE.DirectionalLight(cupData.dirLight2.color, cupData.dirLight2.intensity);
    }

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

    if (!isPlaying) {
      this.cupGeometry = new THREE.CylinderBufferGeometry(
        cupData.cup.radiusTop,
        cupData.cup.radiusBottom,
        cupData.cup.height,
        40, // radialSegments={40}
        5, // heightSegments={5}
        cupData.cup.openEnded // openEnded
      );
    }

    if (!isPlaying) {
      this.bgGeometry = new THREE.PlaneBufferGeometry(
        cupData.bg.width,
        cupData.bg.height
      );
    }

    if (!isPlaying) {
      this.bgMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: cupData.bgTexture,
      });
    }

    if (!isPlaying) {
      this.bgPlaneMesh = new THREE.Mesh(this.bgGeometry, this.bgMaterial);
    }

    if (!isPlaying) {
      this.cupMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.FrontSide,
        map: cupData.cupTexture,
        transparent: true,
        depthWrite: false,
        opacity: cupData.cup.opacity,
      });
    }

    if (!isPlaying) {
      this.cupBgMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
        opacity: cupData.cup.opacity,
      });
    }

    const cupRotationOrder = 'XZY';
    if (!isPlaying) {
      this.cupMesh = new THREE.Mesh(this.cupGeometry);
    }
    this.cupMesh.material = this.cupMaterial;
    this.cupMesh.position.x = cupData.cup.posX;
    this.cupMesh.position.y = cupData.cup.posY;
    this.cupMesh.position.z = cupData.cup.posZ;
    this.cupMesh.rotation.x = deg(cupData.cup.rotX);
    this.cupMesh.rotation.y = deg(cupData.cup.rotY);
    this.cupMesh.rotation.z = deg(cupData.cup.rotZ);
    this.cupMesh.rotation.order = cupRotationOrder;

    if (!isPlaying) {
      this.cupBgMesh = new THREE.Mesh(this.cupGeometry);
    }
    this.cupBgMesh.material = this.cupBgMaterial;
    this.cupBgMesh.position.x = cupData.cup.posX;
    this.cupBgMesh.position.y = cupData.cup.posY;
    this.cupBgMesh.position.z = cupData.cup.posZ - 1;
    this.cupBgMesh.rotation.x = deg(cupData.cup.rotX);
    this.cupBgMesh.rotation.y = deg(cupData.cup.rotY);
    this.cupBgMesh.rotation.z = deg(cupData.cup.rotZ);
    this.cupBgMesh.rotation.order = cupRotationOrder;

    if (!isPlaying) {
      this.group = new THREE.Group();
    }
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
      if (!isPlaying) {
          this.overlayGeometry = new THREE.PlaneBufferGeometry(
            cupData.bg.width,
            cupData.bg.height
          );
      }

      if (!isPlaying) {
        this.overlayMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          color: 0xffffff,
          // side: THREE.DoubleSide,
          side: THREE.FrontSide,
          map: cupData.overlayTexture,
          // depthWrite  : false
        });
      }

      if (!isPlaying) {
        this.overlayPlaneMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial);
      }
      this.overlayPlaneMesh.position.z = 0;

      this.group.add(this.overlayPlaneMesh);
    }

    this.scene.add(this.group);

    renderer.render(this.scene, this.camera);
  }

  toDataURL = () => {
    return this.renderer.domElement.toDataURL('image/jpeg');
  }

  @action onClickCup() {
    const { onClickCup, keyId } = this.props;

    onClickCup(keyId);
  }

  render() {
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
