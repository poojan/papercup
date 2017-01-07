// const bgImage = 'img/bg/stock-photo-paper-cup-of-coffee-on-wooden-table-closeup-465827084.jpg';
const bgImage = 'img/bg/wooden_table.jpg';
const cupImage = 'img/user/cuplogo.png';
// const cupImage = 'img/user/Spotify_variante_\(logo\).png';
const overlayImage = null;
const scaling = 0.35;

export default {
  id: 'wooden',

  bg: {
    width: 1500 * scaling,
    height: 1101 * scaling,
    image: bgImage,
    overlay: overlayImage,
  },

  grp: {
    // rotX: 63,
  },

  ambLight: {
    color: 0xd5cac6,
  },

  dirLight1: {
    posX: 350,
    posY: 0,
    posZ: 0,
    lookAtX: 40,
    lookAtY: 0,
    lookAtZ: 0,
    intensity: 0.2,
  },

  camera: {
    posZ: 890,
    projection: 'perspective',
    fov: 24,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 77.9,
    "radiusBottom": 60.300000000000004,
    "height": 197.4,
    "posX": 11,
    "posY": -37.4,
    "posZ": -7,
    "rotX": 8.87,
    "rotY": 0,
    "rotZ": 1.43,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
