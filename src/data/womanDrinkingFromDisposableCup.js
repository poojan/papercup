// const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
const bgImage = 'img/bg/shutterstock_218754565.jpg';
// const cupImage = 'img/user/cuplogo.png';
const cupImage = 'img/user/Spotify_variante_(logo).png';
// const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';
const overlayImage = 'img/fg/fingers3.png';
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
    fov: 11.3,
    // fov: 32,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 140.3,
    "radiusBottom": 106.4,
    "height": 284.90000000000003,
    "posX": -98.5,
    "posY": 16.7,
    "posZ": -5.6000000000000005,
    "rotX": 5.39,
    "rotY": -3.93,
    "rotZ": 10.91,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
}

