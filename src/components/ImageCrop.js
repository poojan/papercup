import React, { Component } from 'react';
import Modal from 'react-modal';
import request from 'superagent';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { BASE_URL } from '../config';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

@inject('uiStore')
@observer
export default class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.onCropClick = this.onCropClick.bind(this);
  }

  @action _crop = () => {
    const { uiStore } = this.props;
    console.log('_crop');
    uiStore.cropped = this.refs.cropper.getCroppedCanvas().toDataURL();
  }

  onCropClick() {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'CUPS';
  }

  render() {
    const { uiStore } = this.props;
    console.log('uiStore.imagePath', uiStore.imagePath);

    // if (!uiStore.imagePath) { return <div />; }

    return (
      <div>
        <button onClick={this.closeModal}>close</button>
        <Cropper
          ref={'cropper'}
          src={uiStore.imagePath}
          guides={false}
          crop={this._crop}
        />
        <button className="BlueButton" type="button" onClick={this.onCropClick}>
          Crop
        </button>
      </div>
    );
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <div>
        <button onClick={this.closeModal}>close</button>
        <Cropper
          ref={'cropper'}
          src={uiStore.imagePath}
          style={{height: 400, width: '100%'}}
          guides={false}
          crop={this._crop}
        />
      </div>
      </Modal>
    );
  }
}
