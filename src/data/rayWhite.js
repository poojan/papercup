const bgImage = 'img/bg/ray_white.jpg';
// const cupImage = 'img/user/cuplogo.png';
const cupImage = 'img/user/hats.jpg';
// const cupImage = 'img/user/Spotify_variante_(logo).png';
// const cupImage = 'img/user/chrysanthemum.jpg';
const overlayImage = null;

const bgActualWidth = 2973;
const bgActualHeight = 1982;

const scaling = 600 / bgActualWidth;
const bgScaledWidth = bgActualWidth * scaling;
const bgScaledHeight = bgActualHeight * scaling;

export default {
  id: 'rayWhite',

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
    intensity: 0.1,
  },

  camera: {
    // posZ: 1000,
    posZ: 1520,
    projection: 'perspective',
    fov: 16,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 74.2,
    "radiusBottom": 56.5,
    "height": 164.9,
    "posX": -9.9,
    "posY": -21.9,
    "posZ": -7,
    "rotX": 4.22,
    // "rotY": -3.93,
    "rotZ": 0,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
