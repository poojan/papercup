// const bgImage = 'img/bg/stock-photo-prepares-espresso-147372080.jpg';
const bgImage = 'img/bg/espresso.jpg';
const cupImage = 'img/user/cuplogo.png';
// const cupImage = 'img/user/Spotify_variante_\(logo\).png';
// const cupImage = 'img/user/chrysanthemum.jpg';
const overlayImage = null;

// const bgActualWidth = 1500;
// const bgActualHeight = 1300;

const bgActualWidth = 1000;
const bgActualHeight = 800;

const scaling = 600 / bgActualWidth;
const bgScaledWidth = bgActualWidth * scaling;
const bgScaledHeight = bgActualHeight * scaling;

export default {
  id: 'espresso',

  bg: {
    width: bgScaledWidth,
    height: bgScaledHeight,
    image: bgImage,
    overlay: overlayImage,
  },

  grp: {
    // rotX: 63,
  },

  ambLight: {
    color: '#e8dfd3',
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
    posZ: 1000,
    projection: 'perspective',
    fov: 25,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 67.7,
    "radiusBottom": 55.8,
    "height": 131,
    "posX": -135,
    "posY": -109.30000000000001,
    "posZ": -7,
    "rotX": 7.99,
    "rotY": -3.93,
    "rotZ": -4.04,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
};
