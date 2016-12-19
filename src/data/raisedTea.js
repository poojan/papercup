const bgImage = 'bg/528364288-paper-cup-offering-raised-tea.jpg';
const cupImage = 'cuplogo.png';

export default {
  scene: {
    width: 800,
    height: 800,
  },

  bg: {
    width: 480,
    height: 270,
    image: bgImage,
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
    posZ: 1460,
    projection: 'perspective',
    fov: 17,
    // projection: 'orthographic',
  },

  cup: {
    "radiusTop": 65.6,
    "radiusBottom": 51.6,
    "height": 148.6,
    "posX": 17,
    "posY": -16.400000000000002,
    "posZ": -7,
    "rotX": 6.37,
    "rotY": 0,
    "rotZ": 0.38,
    "opacity": 1,
    "openEnded": 1,
    image: cupImage,
  },
}

