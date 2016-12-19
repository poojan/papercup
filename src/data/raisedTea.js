const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';

export default {
  scene: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  bg: {
    width: 1500,
    height: 1100,
    image: bgImage,
    overlay: overlayImage,
  },

  dirLight1: {
    posX: 150,
    posY: 0,
    posZ: 146,
    lookAtX: 40,
    lookAtY: 0,
    lookAtZ: 0,
    intensity: 1.4,
  },

  camera: {
    posZ: 1460,
    projection: 'perspective',
    fov: 47,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 250,
    "radiusBottom": 200,
    "height": 500,
    "posX": -189,
    "posY": 80,
    "posZ": -7,
    "rotX": 6.37,
    "rotY": 70,
    "rotZ": 8.6,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
}

