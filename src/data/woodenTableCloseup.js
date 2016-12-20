const bgImage = 'img/bg/stock-photo-paper-cup-of-coffee-on-wooden-table-closeup-465827084.jpg';
const cupImage = 'img/user/cuplogo.png';
const overlayImage = null;
const scaling = 0.35;

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
    posZ: 1000,
    projection: 'perspective',
    fov: 25,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 77.9,
    "radiusBottom": 60.300000000000004,
    "height": 177.3,
    "posX": 11,
    "posY": -16,
    "posZ": -7,
    "rotX": 8.91,
    "rotY": 0,
    "rotZ": 1,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
