import React, { Component } from 'react';
import { observer } from 'mobx-react';

const DAT = require('dat.gui/build/dat.gui.js');

@observer
export default class DatGui extends Component {
  constructor(props) {
    super(props);

    const { store } = props;

    const gui = new DAT.GUI();

    const sceneGui = gui.addFolder('Scene');
    sceneGui.add(store.scene, 'width');
    sceneGui.add(store.scene, 'height');

    const cameraGui = gui.addFolder('Camera');
    cameraGui.add(store.camera, 'posX');
    cameraGui.add(store.camera, 'posY');
    cameraGui.add(store.camera, 'posZ');
    cameraGui.add(store.camera, 'rotX');
    cameraGui.add(store.camera, 'rotY');
    cameraGui.add(store.camera, 'rotZ');
    cameraGui.add(store.camera, 'fov');
    cameraGui.add(store.camera, 'projection', {
      orthographic: 'orthographic',
      perspective: 'perspective',
    });

    const dirLight1Gui = gui.addFolder('Directional Light 1');
    dirLight1Gui.add(store.dirLight1, 'posX').step(1);
    dirLight1Gui.add(store.dirLight1, 'posY').step(1);
    dirLight1Gui.add(store.dirLight1, 'posZ').step(1);
    dirLight1Gui.add(store.dirLight1, 'lookAtX').step(1)
    dirLight1Gui.add(store.dirLight1, 'lookAtY').step(1);
    dirLight1Gui.add(store.dirLight1, 'lookAtZ').step(1);

    const dirLight2Gui = gui.addFolder('Directional Light 2');
    dirLight2Gui.add(store.dirLight2, 'posX').step(1);
    dirLight2Gui.add(store.dirLight2, 'posY').step(1);
    dirLight2Gui.add(store.dirLight2, 'posZ').step(1);
    dirLight2Gui.add(store.dirLight2, 'lookAtX').step(1)
    dirLight2Gui.add(store.dirLight2, 'lookAtY').step(1);
    dirLight2Gui.add(store.dirLight2, 'lookAtZ').step(1);

    const grpGui = gui.addFolder('Group');
    grpGui.add(store.grp, 'posX').step(1);
    grpGui.add(store.grp, 'posY').step(1);
    grpGui.add(store.grp, 'posZ').step(1);
    grpGui.add(store.grp, 'rotX').step(1)
    grpGui.add(store.grp, 'rotY').step(1);
    grpGui.add(store.grp, 'rotZ').step(1);

    const bgGui = gui.addFolder('Background');
    bgGui.add(store.bg, 'posX').step(0.1);
    bgGui.add(store.bg, 'posY').step(0.1);
    bgGui.add(store.bg, 'posZ').step(0.1);
    bgGui.add(store.bg, 'rotX').step(0.01)
    bgGui.add(store.bg, 'rotY').step(0.01);
    bgGui.add(store.bg, 'rotZ').step(0.01);
    bgGui.add(store.bg, 'width');
    bgGui.add(store.bg, 'height').step(1);
    // bgGui.open();


    const cupGui = gui.addFolder('Cup');
    cupGui.add(store.cup, 'radiusTop').step(0.1);
    cupGui.add(store.cup, 'radiusBottom').step(0.1);
    cupGui.add(store.cup, 'height').step(0.1);
    cupGui.add(store.cup, 'posX').step(0.1);
    cupGui.add(store.cup, 'posY').step(0.1);
    cupGui.add(store.cup, 'posZ').step(0.1);
    cupGui.add(store.cup, 'rotX').step(0.01)
    cupGui.add(store.cup, 'rotY').step(0.01);
    cupGui.add(store.cup, 'rotZ').step(0.01);
    cupGui.add(store.cup, 'opacity').min(0).max(1).step(0.01);
    cupGui.add(store.cup, 'openEnded').min(0).max(1).step(1);
    cupGui.open();

    // cameraGui.add(store.camera, 'rotX').step(0.01)
    // cameraGui.add(store.camera, 'rotY').step(0.01);
    // cameraGui.add(store.camera, 'rotZ').step(0.01);
    // cameraGui.add(store.camera, 'width');
    // cameraGui.add(store.camera, 'height');
    // cameraGui.open();

    gui.add(store, 'log');
  }

  render() {
    return (
      <div />
    );
  }
}
