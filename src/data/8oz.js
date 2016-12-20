const bgImage = 'img/bg/8oz.jpg';
// const cupImage = 'img/user/cuplogo.png';
const cupImage = 'img/user/Spotify_variante_\(logo\).png';
const overlayImage = null;

export default {
  scene: {
    width: 800,
    height: 600,
  },

  bg: {
    width: 638,
    height: 572,
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
    intensity: 0,
  },

  camera: {
    posZ: 2000,
    projection: 'perspective',
    fov: 17,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 163.60000000000002,
    "radiusBottom": 125.5,
    "height": 307.20000000000005,
    "posX": 2.1,
    "posY": -12.5,
    "posZ": -7,
    "rotX": 4.22,
    "rotY": -3.93,
    "rotZ": 0,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
