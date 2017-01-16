import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

@inject('uiStore')
@observer
export default class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.onCropClick = this.onCropClick.bind(this);
  }

  @action _crop = () => {
    // const { uiStore } = this.props;
    // console.log('_crop');
    // uiStore.cropped = this.refs.cropper.getCroppedCanvas().toDataURL();
  }

  onCropClick() {
    const { uiStore } = this.props;
    uiStore.cropped = this.refs.cropper.getCroppedCanvas().toDataURL();
    uiStore.activeScreen = 'CUPS';
  }

  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_DROP';
  }

  @action onSliderChange = (val) => {
    this.refs.cropper.scale(val);
  }

  render() {
    const { uiStore } = this.props;
    console.log('uiStore.imagePath', uiStore.imagePath);

    // if (!uiStore.imagePath) { return <div />; }

    return (
      <div>
        <Cropper
          className="Cropper"
          ref={'cropper'}
          src={uiStore.imagePath}
          guides={false}
          crop={this._crop}
          aspectRatio={3}
          style={{
            height: '500px',
          }}
        />
        <Slider
          min={0.5}
          max={4}
          step={0.01}
          defaultValue={1}
          onChange={this.onSliderChange}
          className="Slider"
        />
        <button className="BlueButton" type="button" onClick={this.onBackClick}>
          {'< Select New Image'}
        </button>
        <button className="OrangeButton" type="button" onClick={this.onCropClick}>
          {'Crop Image >'}
        </button>
      </div>
    );
  }
}
