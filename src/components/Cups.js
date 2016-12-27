import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import Cup from './Cup';

@inject('uiStore', 'cupStore')
@observer
export default class Cups extends Component {
  @observable keyId;
  @observable currentCup;

  constructor(props) {
    super(props);

    // this.keyId = "rayWhite";

    const { cupStore, uiStore } = props;
    this.onClickCup = this.onClickCup.bind(this);
    this.currentCup = cupStore.findById(uiStore.activeKeyId);
  }

  // @observable isPlaying = false;

  @action onClickCup(keyId) {
    this.pause();
    setTimeout(() => {
      const { cupStore, uiStore } = this.props;
      this.currentCup = cupStore.findById(uiStore.activeKeyId);
      uiStore.activeKeyId = keyId;
      console.log(uiStore.keyId);
    }, 200);
  }

  @computed get isPlaying() {
    // const { cupStore, uiStore } = this.props;
    // const currentCup = cupStore.findById(uiStore.activeKeyId);
    return this.currentCup.isPlaying;
  }

  @action play = () => {
    this.currentCup.play();
  }

  @action pause = () => {
    // const { cupStore, uiStore } = this.props;
    // const currentCup = cupStore.findById(uiStore.activeKeyId);
    this.currentCup.pause();
    // this.isPlaying = false;
  }

  @action togglePlayPause = () => {
    if (this.currentCup.isPlaying) {
      setTimeout(() => {
        this.currentCup.pause();
      }, 200);
    } else {
      setTimeout(() => {
        this.currentCup.play();
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
