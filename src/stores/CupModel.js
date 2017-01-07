import { observable, computed, extendObservable, action, toJS } from 'mobx';
import * as THREE from 'three';

const loader = new THREE.TextureLoader();

const loadTexture = (img) => new Promise((resolve, reject) => {
  loader.load(
    img,
    function onLoad(texture) {
      resolve(texture);
    },
    function onProgress(xhr) {
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function onError(xhr) {
      console.log('Error: ', xhr);
      reject();
    }
  )
});

const processTexture = (texture, repeatU, repeatV) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatU || 1, repeatV || 1);
  texture.anisotropy = 16;
  return texture;
};

const bgImage = '';
const cupImage = '';

const deg = rad => rad * Math.PI / 180;

class CupModel {
  id;
  @observable bgTexture;
  @observable cupTexture;
  @observable overlayTexture;

  @observable scene = {
    width: 200 * 0.7,
    height: 150 * 0.7,
  };

  @observable grp = {
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    position: computed(() => new THREE.Vector3(this.grp.posX, this.grp.posY, this.grp.posZ)),
    rotation: computed(() => new THREE.Euler(deg(this.grp.rotX), deg(this.grp.rotY), deg(this.grp.rotZ))),
  };

  @observable bg = {
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    width: 509,
    height: 381,
    image: bgImage,
    position: computed(() => new THREE.Vector3(this.bg.posX, this.bg.posY, this.bg.posZ)),
    rotation: computed(() => new THREE.Euler(deg(this.bg.rotX), deg(this.bg.rotY), deg(this.bg.rotZ))),
  };

  @observable camera = {
    projection: 'perspective',
    posX: 0,
    posY: 0,
    posZ: 100,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    fov: 45,
    // zoom: 1,
    position: computed(() => new THREE.Vector3(
      this.camera.posX, this.camera.posY, this.camera.posZ
    )),
    rotation: computed(() => new THREE.Euler(deg(this.camera.rotX), deg(this.camera.rotY), deg(this.camera.rotZ))),
    lookAt: computed(() => new THREE.Vector3(0, 0, 0)),
  };

  @observable ambLight = {
    color: 0xffffff,
  };

  @observable dirLight1 = {
    posX: 0,
    posY: 0,
    posZ: 0,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,

    intensity: 0,
    color: 0xffffff,

    position: computed(() => new THREE.Vector3(
      this.dirLight1.posX,
      this.dirLight1.posY,
      this.dirLight1.posZ
    )),

    lookAt: computed(() => new THREE.Vector3(
      this.dirLight1.lookAtX,
      this.dirLight1.lookAtY,
      this.dirLight1.lookAtZ
    )),
  };

  @observable dirLight2 = {
    posX: 0,
    posY: 0,
    posZ: 0,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,

    intensity: 0,
    color: 0xffffff,

    position: computed(() => new THREE.Vector3(
      this.dirLight2.posX,
      this.dirLight2.posY,
      this.dirLight2.posZ
    )),

    lookAt: computed(() => new THREE.Vector3(
      this.dirLight2.lookAtX,
      this.dirLight2.lookAtY,
      this.dirLight2.lookAtZ
    )),
  };

  @observable cup = {
    radiusTop: 72,
    radiusBottom: 56,
    height: 206,
    posX: 3,
    posY: -32,
    posZ: -2,
    rotX: 6.875,
    rotY: 0,
    rotZ: 0,
    opacity: 0.4,
    openEnded: 1,
    image: cupImage,
    position: computed(() => new THREE.Vector3(this.cup.posX, this.cup.posY, this.cup.posZ)),
    rotation: computed(() => new THREE.Euler(deg(this.cup.rotX), deg(this.cup.rotY), deg(this.cup.rotZ))),
  };

  constructor(data) {
    this.setData(data);

    this.rotate = this.rotate.bind(this);
  }

  @action setData(obsData) {
    const data = toJS(obsData);

    if (data.id) {
      this.id = data.id;
    }

    if (data.scene) {
      this.scene = extendObservable(this.scene, data.scene);
    }
    if (data.camera) {
      this.camera = extendObservable(this.camera, data.camera);
    }
    if (data.ambLight) {
      this.ambLight = extendObservable(this.ambLight, data.ambLight);
    }
    if (data.dirLight1) {
      this.dirLight1 = extendObservable(this.dirLight1, data.dirLight1);
    }
    if (data.dirLight2) {
      this.dirLight2 = extendObservable(this.dirLight2, data.dirLight2);
    }
    if (data.grp) {
      this.grp = extendObservable(this.grp, data.grp);
    }
    if (data.bg) {
      this.bg = extendObservable(this.bg, data.bg);
    }
    if (data.cup) {
      this.cup = extendObservable(this.cup, data.cup);
    }
  }

  @action loadCupTexture(cupImage) {
    // if (this.cupTexture) { return Promise.resolve(); }
    return loadTexture(cupImage || this.cup.image)
      .then(texture => {
        this.cupTexture = processTexture(texture);
      });
  }


  @action load() {
    if (this.bgTexture) {
      return Promise.resolve();
    }

    return Promise.all([
      loadTexture(this.bg.image),
    ])
      .then(values => {
        this.bgTexture = processTexture(values[0]);

        if (this.bg.overlay) {
          return loadTexture(this.bg.overlay)
            .then(texture => {
              this.overlayTexture = texture;
            });
        }
      });
  }

  log = () => {
    const data = {
      scene: this.scene,
      camera: this.camera,
      ambLight: this.ambLight,
      dirLight1: this.dirLight1,
      dirLight2: this.dirLight2,
      grp: this.grp,
      bg: this.bg,
      cup: this.cup,
    };
    console.log(JSON.stringify(data, null, 2));
  }

  @observable isPlaying = false;
  req;
  @observable rotateDirection = 1;

  @action rotate() {
    this.cup.rotY += deg(20 * this.rotateDirection);
    this.req = requestAnimationFrame(this.rotate);
  }
  @action play() {
    if (this.isPlaying) { return; }
    this.isPlaying = true;
    this.req = requestAnimationFrame(this.rotate);
  }

  @action playForward() {
    this.rotateDirection = 1;
    this.play();
  }
  @action playReverse() {
    this.rotateDirection = -1;
    this.play();
  }

  @action pause() {
    window.cancelAnimationFrame(this.req);
    this.isPlaying = false;
  }
}

export default CupModel;
