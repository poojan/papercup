import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import Cup from './Cup';
import DatGui from './DatGui';

@inject('uiStore', 'cupStore')
@observer
export default class Cups extends Component {
  @observable keyId;
  @observable currentCup;
  @observable rfs = {};

  constructor(props) {
    super(props);

    const { cupStore, uiStore } = props;
    this.onClickCup = this.onClickCup.bind(this);
    this.currentCup = cupStore.findById(uiStore.activeKeyId);
  }

  @action onClickCup(keyId) {
    this.pause();
    // this.currentCup.imgData =
    setTimeout(() => {
      const { cupStore, uiStore } = this.props;
      this.currentCup = cupStore.findById(uiStore.activeKeyId);
      uiStore.activeKeyId = keyId;
      console.log(uiStore.keyId);
    }, 200);
  }

  @computed get isPlaying() {
    return this.currentCup.isPlaying;
  }

  @action playForward = () => {
    this.currentCup.playForward();
  }

  @action playReverse = () => {
    this.currentCup.playReverse();
  }

  @action pause = () => {
    this.currentCup.pause();
  }

  @action togglePlayPause = () => {
    if (this.currentCup.isPlaying) {
      setTimeout(() => {
        this.currentCup.pause();
      }, 200);
    }
  }

  @action onSelectClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_DROP';
  }
  @action onEditClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'IMAGE_CROP';
  }

  @action onEmailClick = () => {
    const { uiStore, cupStore } = this.props;
    cupStore.items.forEach(action(item => {
      // const dataURL = document.querySelector(`#${item.id} canvas`).toDataURL()
      const dataURL = document.querySelector(`#${item.id} canvas`).toDataURL('image/jpeg');
      item.setDataURL(dataURL);
    }));
    this.currentCup.pause();
    uiStore.activeScreen = 'EMAIL_MOCKUPS';
  }

  render() {
    const { uiStore, cupStore } = this.props;
    const scale = 1;
    const width = 1024 * scale;
    const height = 768 * scale;
    const store = cupStore.findById(uiStore.activeKeyId);

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

    return (
      <div className="Row">
        <div className="MainImage">
          <Cup width={width} height={height} containerId="main"
            keyId={uiStore.activeKeyId} rotate={true}
            onClickCup={this.togglePlayPause}
          />
          {/*
            <DatGui store={store} />
          */}

          <div>
          {!this.isPlaying && (
            <div>
              <button className="WhiteButton" type="button" onClick={this.playReverse}>
                <i className="fa fa-play reverse" aria-hidden="true"></i>
              </button>

              <div className="light inline-block">
                <div className="line1">Rotate</div>
                <div className="line2">Cup</div>
              </div>

              <button className="WhiteButton" type="button" onClick={this.playForward}>
                <i className="fa fa-play" aria-hidden="true"></i>
              </button>
            </div>
          )}
          {this.isPlaying && (
            <button className="WhiteButton" type="button" onClick={this.pause}>
              <i className="fa fa-pause" aria-hidden="true"></i>
            </button>
          )}
          </div>
          <div className="Buttons">
            {/*
            <button className="BlueButton" type="button" onClick={this.onSelectClick}>
              Select New Image
            </button>
            */}
            <button className="BlueButton" type="button" onClick={this.onEditClick}>
              {'< Back'}
            </button>
            <button className="OrangeButton" type="button" onClick={this.onEmailClick}>
              {'Email Images >'}
            </button>
          </div>
        </div>
        <div className="Thumbnails">
          {cupStore.items.map(item => (
            <Cup
              ref={ref => { this.rfs[item.id] = ref }}
              key={item.id}
              containerId={item.id}
              keyId={item.id}
              onClickCup={this.onClickCup}
              onMousedown={this.onClickCup}
              width={width} height={height}
            />
          ))}
        </div>
      </div>
    );
  }
}
