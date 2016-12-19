const bgImage = 'img/bg/8oz.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = null;

export default {
  scene: {
    width: window.innerWidth,
    height: window.innerHeight,
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
    intensity: 1.4,
  },

  camera: {
    posZ: 5760,
    projection: 'perspective',
    fov: 7,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 161.5,
    "radiusBottom": 122.7,
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
