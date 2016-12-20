const bgImage = 'img/bg/stock-photo-take-away-paper-cup-with-the-hand-of-man-play-smart-phone-456359746.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = null;
const scaling = 0.35;

export default {
  scene: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  bg: {
    width: 1500 * scaling,
    height: 1101 * scaling,
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
    posZ: 1000,
    projection: 'perspective',
    fov: 25,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 79.4,
    "radiusBottom": 66.60000000000001,
    "height": 148.4,
    "posX": 47.2,
    "posY": -17.1,
    "posZ": -7,
    "rotX": 14.77,
    "rotY": 0,
    "rotZ": 1,
    "opacity": 0.8,
    "openEnded": 1,
    image: cupImage,
  },
};
