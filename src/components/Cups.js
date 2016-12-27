import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import Cup from './Cup';

@inject('uiStore', 'cupStore')
@observer
export default class Cups extends Component {
  @observable keyId;

  constructor(props) {
    super(props);

    // this.keyId = "rayWhite";

    this.onClickCup = this.onClickCup.bind(this);
  }

  @observable isPlaying = false;

  @action onClickCup(keyId) {
    const { uiStore } = this.props;
    uiStore.activeKeyId = keyId;
    console.log(uiStore.keyId);
  }

  @action play = () => {
    const { cupStore, uiStore } = this.props;
    const foundCup = cupStore.findById(uiStore.activeKeyId);
    foundCup.play();
    this.isPlaying = true;
  }

  @action pause = () => {
    const { cupStore, uiStore } = this.props;
    const foundCup = cupStore.findById(uiStore.activeKeyId);
    foundCup.pause();
    this.isPlaying = false;
  }

  @action togglePlayPause = () => {
    const { cupStore, uiStore } = this.props;
    const foundCup = cupStore.findById(uiStore.activeKeyId);

    if (this.isPlaying) {
      foundCup.pause();
      setTimeout(() => {
        this.isPlaying = false;
      }, 100);
    } else {
      foundCup.play();
      setTimeout(() => {
        this.isPlaying = true;
      }, 100);
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

  render() {
    const { uiStore, cupStore } = this.props;
    const scale = 1;
    const width = 800 * scale;
    const height = 600 * scale;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

          // <DatGui store={cupStore} />
    return (
      <div className="Row" style={{ width: "1000px" }}>
        <div className="MainImage">
          <Cup width={width} height={height} containerId="main"
            keyId={uiStore.activeKeyId} rotate={true}
            onClickCup={this.togglePlayPause}
          />

          <div>
          {!this.isPlaying && (
            <button className="WhiteButton" type="button" onClick={this.play}>
              <i className="fa fa-play" aria-hidden="true"></i>
            </button>
          )}
          {this.isPlaying && (
            <button className="WhiteButton" type="button" onClick={this.pause}>
              <i className="fa fa-pause" aria-hidden="true"></i>
            </button>
          )}
          </div>
          <div>
            <button className="BlueButton" type="button" onClick={this.onSelectClick}>
              Select New Image
            </button>
            <button className="BlueButton" type="button" onClick={this.onEditClick}>
              Edit Current Image
            </button>
            <button className="BlueButton" type="button" onClick={this.onEmailClick}>
              Email Me Mockups
            </button>
          </div>
        </div>
        <div className="Thumbnails">
          {cupStore.items.map(item => (
            <Cup
              key={item.id}
              containerId={item.id}
              keyId={item.id}
              onClickCup={this.onClickCup}
            />
          ))}
        </div>
      </div>
    );
  }
}
