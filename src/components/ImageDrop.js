import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { BASE_URL } from '../config';

@inject('uiStore')
@observer
export default class ImageDrop extends Component {
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
          <img src="img/bg/Ray white 3D Mockup.jpg" width="800" />
        </Dropzone>
        <button className="BlueButton" type="button" onClick={this.onOpenClick}>
          Upload Image
        </button>
      </div>
    );
  }
}
