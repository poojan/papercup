const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';

const bgActualWidth = 1500;
const bgActualHeight = 1100;

// const scaling = 600 / bgActualWidth;
const scaling = 0.8;
const bgScaledWidth = bgActualWidth * scaling;
const bgScaledHeight = bgActualHeight * scaling;
console.log(bgScaledWidth, bgScaledHeight);

export default {
  scene: {
    width: 800,
    height: 600,
  },

  bg: {
    width: bgScaledWidth,
    height: bgScaledHeight,
    image: bgImage,
    overlay: overlayImage,
  },

  grp: {
    // rotX: 63,
    // posY: 900,
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
    posZ: 2000,
    projection: 'perspective',
    fov: 25,
    // fov: 32,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 268.1 * scaling,
    "radiusBottom": 200 * scaling,
    "height": 570 * scaling,
    "posX": -189 * scaling,
    "posY": 61.7 * scaling,
    "posZ": -7 * scaling,
    "rotX": 10.97,
    "rotY": -3.93,
    "rotZ": 10.6,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
}

