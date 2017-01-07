import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { BASE_URL } from '../config';

@inject('uiStore')
@observer
export default class ImageDrop extends Component {
  @action onDrop = (acceptedFiles) => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_UPLOADING';
    this.files = acceptedFiles;

    const req = request.post(`${BASE_URL}/upload`);

    acceptedFiles.forEach((file)=> {
      req.attach('file', file);
    });

    req.end((err, res) => {
      uiStore.imagePath = `${BASE_URL}/${res.body.path}`;
      uiStore.activeScreen = 'IMAGE_CROP';
    });
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  render() {
    return (
      <div className="ImageDrop">
        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop}
          multiple={false}
          style={{}}
        >
          <img src="img/bg/Ray white 3D Mockup.jpg" width="800" alt="cup" />
        </Dropzone>
        <button className="BlueButton" type="button" onClick={this.onOpenClick}>
          Upload Image
        </button>
      </div>
    );
  }
}
