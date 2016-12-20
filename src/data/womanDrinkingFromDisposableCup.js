const bgImage = 'img/bg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.jpg';
// const cupImage = 'img/user/cuplogo.png';
const cupImage = 'img/user/Spotify_variante_\(logo\).png';
const overlayImage = 'img/fg/stock-photo-young-woman-drinking-coffee-from-disposable-cup-218754565.png';
// const overlayImage = null;

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
    fov: 17,
    // fov: 32,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 211.9,
    "radiusBottom": 164.20000000000002,
    "height": 427.90000000000003,
    "posX": -152,
    "posY": 66.5,
    "posZ": -5.6000000000000005,
    "rotX": 8.9,
    "rotY": -3.93,
    "rotZ": 10.700000000000001,
    "opacity": 1,
    "openEnded": 0,
    image: cupImage,
  },
}

