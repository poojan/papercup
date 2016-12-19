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
    "radiusTop": 268.1,
    "radiusBottom": 200,
    "height": 570,
    "posX": -189,
    "posY": 61.7,
    "posZ": -7,
    "rotX": 6.37,
    "rotY": -3.93,
    "rotZ": 0,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
