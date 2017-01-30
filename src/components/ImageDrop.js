import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { BASE_URL } from '../config';
import Cup from './Cup';
import classNames from 'classnames';

@inject('uiStore', 'cupStore')
@observer
export default class ImageDrop extends Component {
  @action onDrop = (acceptedFiles) => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_UPLOADING';
    this.files = acceptedFiles;
    // console.log('acceptedFiles', JSON.stringify(acceptedFiles, null, 2), acceptedFiles);

    const req = request.post(`${BASE_URL}/upload`);

    acceptedFiles.forEach((file)=> {
      req.attach('file', file);
    });

    req.end((err, res) => {
      setTimeout(action(() => {
        uiStore.imagePath = `${BASE_URL}/${res.body.path}`;
        uiStore.activeScreen = 'IMAGE_CROP';
      }), 500);
    });
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  render() {
    const { cupStore, uiStore, uploading } = this.props;
    const keyId = 'rayWhite';
    const cupData = cupStore.findById(keyId)
    // cupData.isPlaying = true;
    console.log('cupData', cupData);

    return (
      <div className={classNames({
        'ImageDrop': true,
        'Upload': uploading
      })}>
        {uploading && (
          <div>
            <div className="processing">
              Your image <br />is being <br />uploaded ...
            </div>
            <div style={{ padding: '32px' }}></div>
          </div>
        )}

        {!uploading && (
          <h1>Create your own design in 60 secs</h1>
        )}
        {uploading && (
          <h1>{' '}</h1>
        )}

        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop}
          multiple={false}
          style={{}}
        >
          {/*
          <img src="img/bg/ray_white.jpg" width="800" alt="cup"
            style={{ marginLeft: '24px' }}
          />
          */}
          <div className="MainImage" style={{ marginLeft: 22 }}>
            <Cup width={800} height={600} containerId="main"
              keyId={keyId} rotate={true}
              onClickCup={() => {}}
              cupData={cupData}
              fov={12.7}
            />
          </div>

        </Dropzone>
        {!uploading && (
          <div>
            <button className="BlueButton" type="button" onClick={this.onOpenClick}>
              Upload Image
            </button>
            <p><strong>NOTE:</strong> Your image should be in JPG or PNG format and under 2MB in size.</p>
          </div>
        )}
      </div>
    );
  }
}
