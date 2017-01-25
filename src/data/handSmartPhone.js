// const bgImage = 'img/bg/stock-photo-take-away-paper-cup-with-the-hand-of-man-play-smart-phone-456359746.jpg';
const bgImage = 'img/bg/phone.jpg';
const cupImage = 'img/user/cuplogo.png';
// const cupImage = 'img/user/Spotify_variante_\(logo\).png';
// const cupImage = 'img/user/chrysanthemum.jpg';
const overlayImage = null;
const scaling = 1;

export default {
  id: 'phone',

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
    color: '#b7b2ae',
  },

  dirLight1: {
    posX: 150,
    posY: 0,
    posZ: 146,
    lookAtX: 40,
    lookAtY: 0,
    lookAtZ: 0,
    intensity: 0.2,
  },

  camera: {
    posZ: 1800,
    projection: 'perspective',
    fov: 34,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 223.4,
    "radiusBottom": 200.9,
    "height": 473.3,
    "posX": 132.9,
    "posY": -101,
    "posZ": 0,
    "rotX": 17.94,
    // "rotY": 0,
    "rotZ": 1.45,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
