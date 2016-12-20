const bgImage = 'img/bg/stock-photo-take-away-paper-cup-with-the-hand-of-man-play-smart-phone-456359746.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = null;
const scaling = 1;

export default {
  scene: {
    width: 800,
    height: 600,
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
    posZ: 1800,
    projection: 'perspective',
    fov: 34,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 225.10000000000002,
    "radiusBottom": 198.60000000000002,
    "height": 427.90000000000003,
    "posX": 133.1,
    "posY": -36.4,
    "posZ": 0,
    "rotX": 18.86,
    "rotY": 0,
    "rotZ": 1.1,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
