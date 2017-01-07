import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { BASE_URL } from '../config';

@inject('uiStore')
@observer
export default class ImageUploading extends Component {
  @action onDrop = (acceptedFiles) => {
    const { uiStore } = this.props;
    this.files = acceptedFiles;

    const req = request.post(`${BASE_URL}/upload`);

    acceptedFiles.forEach((file)=> {
      req.attach('file', file);
    });

    req.end((err, res) => {
      // console.log('done', res);
      // this.uploadPath = `${BASE_URL}/${res.body.path}`;
      uiStore.imagePath = `${BASE_URL}/${res.body.path}`;
      uiStore.activeScreen = 'IMAGE_CROP';
    });
  }

  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_DROP';
    console.log('onBackClick', uiStore.activeScreen);
  }

  render() {
    return (
      <div className="ImageUploading">
        <div className="uploading">
          Your image <br />is being <br />uploaded ...
        </div>
        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop}
          multiple={false}
          style={{}}
        >
          <img src="img/bg/Ray white 3D Mockup.jpg" width="800" alt="cup" />
        </Dropzone>
        <button className="BlueButton" type="button" onClick={this.onBackClick}>
          Back
        </button>
      </div>
    );
  }
}
