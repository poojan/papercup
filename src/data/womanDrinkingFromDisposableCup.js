// const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
const bgImage = 'img/bg/disposable_cup.jpg';
const cupImage = 'img/user/cuplogo.png';
// const cupImage = 'img/user/Spotify_variante_(logo).png';
// const cupImage = 'img/user/chrysanthemum.jpg';
// const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';
// const overlayImage = 'img/fg/fingers3.png';
const overlayImage = 'img/fg/disposable_cup_fg.png';
// const overlayImage = null;

const bgActualWidth = 1000;
const bgActualHeight = 667;

// const scaling = 600 / bgActualWidth;
const scaling = 0.8;
const bgScaledWidth = bgActualWidth * scaling;
const bgScaledHeight = bgActualHeight * scaling;

export default {
  id: 'disposableCup',

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

  ambLight: {
    // color: 0xdddde2,
    color: 0xd0d3d7,
  },

  dirLight1: {
    posX: -850,
    posY: 0,
    posZ: 0,
    lookAtX: 40,
    lookAtY: 0,
    lookAtZ: 0,
    intensity: 0.3,
  },

  camera: {
    posZ: 3100,
    projection: 'perspective',
    fov: 9.8,
    // fov: 32,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 141.3,
    "radiusBottom": 109.10000000000001,
    "height": 288.6,
    "posX": -101.9,
    "posY": 19.400000000000002,
    "posZ": -5.6000000000000005,
    "rotX": 5.39,
    "rotY": -3.93,
    "rotZ": 9.9,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
}

