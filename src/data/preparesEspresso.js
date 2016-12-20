const bgImage = 'img/bg/stock-photo-prepares-espresso-147372080.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = null;

const bgActualWidth = 1500;
const bgActualHeight = 1300;

const scaling = 600 / bgActualWidth;
const bgScaledWidth = bgActualWidth * scaling;
const bgScaledHeight = bgActualHeight * scaling;

export default {
  scene: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  bg: {
    width: bgScaledWidth,
    height: bgScaledHeight,
    image: bgImage,
    overlay: overlayImage,
  },

  grp: {
    // rotX: 63,
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
    posZ: 5760,
    projection: 'perspective',
    fov: 7,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 69.10000000000001,
    "radiusBottom": 54,
    "height": 153.3,
    "posX": -134.4,
    "posY": -93.30000000000001,
    "posZ": -7,
    "rotX": 4.22,
    "rotY": -3.93,
    "rotZ": 0,
    "opacity": 0.6,
    "openEnded": 1,
    image: cupImage,
  },
};
