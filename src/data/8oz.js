const bgImage = 'img/bg/8oz.jpg';
const cupImage = 'img/user/cuplogo.png';
// const cupImage = 'img/user/Spotify_variante_(logo).png';
// const cupImage = 'img/user/chrysanthemum.jpg';
const overlayImage = null;

export default {
  id: 'eightoz',

  bg: {
    width: 638,
    height: 572,
    image: bgImage,
    overlay: overlayImage,
  },

  grp: {
    // rotX: 63,
    posY: -29,
  },

  ambLight: {
    color: 0xe1dad8,
  },

  dirLight1: {
    posX: 0,
    posY: 1500,
    posZ: 1946,
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,
    intensity: 0.2,
  },

  camera: {
    posZ: 2000,
    projection: 'perspective',
    fov: 23,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 165.4,
    "radiusBottom": 125.2,
    "height": 307.20000000000005,
    "posX": 2.1,
    "posY": -12.5,
    "posZ": -7,
    "rotX": 4.22,
    // "rotY": -3.93,
    "rotZ": 0,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
