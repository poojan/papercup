import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import Cup from './Cup';

@inject('uiStore', 'cupStore')
@observer
export default class Cups extends Component {
  @observable keyId;
  @observable currentCup;
  @observable rfs = {};
  @observable renderers = {};
  @observable images = {};

  constructor(props) {
    super(props);

    const { cupStore, uiStore } = props;
    this.onClickCup = this.onClickCup.bind(this);
    this.currentCup = cupStore.findById(uiStore.activeKeyId);
    this.onRenderer = this.onRenderer.bind(this);
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
    const { uiStore } = this.props;
    this.currentCup.pause();
    // console.log('this.rfs', this.rfs);
    // console.log(
      // 'this.rfs',
      // uiStore.activeKeyId,
      // this.rfs[uiStore.activeKeyId],
      // ReactDOM.findDOMNode(this.rfs[uiStore.activeKeyId]),
      // ReactDOM.findDOMNode(this.rfs[uiStore.activeKeyId]).firstElementChild,
      // ReactDOM.findDOMNode(this.rfs[uiStore.activeKeyId]).firstElementChild.toDataURL(),
      // document.querySelector(`#rayWhite canvas`).toDataURL()
    // );
    // console.log(this.renderers[uiStore.activeKeyId].domElement.toDataURL());
    // console.log('this.renderers', this.renderers[uiStore.activeKeyId]);
    // console.log('dataURL', this.currentCup.dataURL);
    // console.log('rfs', this.rfs[uiStore.activeKeyId]);
    // console.log('rfs', this.rfs[uiStore.activeKeyId].toDataURL());
    // console.log(this.currentCup.toDataURL());
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
    console.log('cupStore.items', cupStore.items);
    cupStore.items.forEach(action(item => {
      const dataURL = document.querySelector(`#${item.id} canvas`).toDataURL()
      item.setDataURL(dataURL);
    }));
    this.currentCup.pause();
    uiStore.activeScreen = 'EMAIL_MOCKUPS';
  }

  @action onRenderer(keyId, renderer) {
    this.renderers[keyId] = renderer;
    console.log('renderer', renderer);
  }

  @action onExit = (keyId, dataURL) => {
    this.images[keyId] = dataURL;
    console.log(dataURL);
  }

  render() {
    const { uiStore, cupStore } = this.props;
    const scale = 1;
    const width = 800 * scale;
    const height = 600 * scale;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

    return (
      <div className="Row">
        <div className="MainImage">
          <Cup width={width} height={height} containerId="main"
            keyId={uiStore.activeKeyId} rotate={true}
            onClickCup={this.togglePlayPause}
          />

          <div>
          {!this.isPlaying && (
            <div>
              <button className="WhiteButton" type="button" onClick={this.playReverse}>
                <i className="fa fa-play reverse" aria-hidden="true"></i>
              </button>

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
          <div>
            <button className="BlueButton" type="button" onClick={this.onSelectClick}>
              Select New Image
            </button>
            <button className="BlueButton" type="button" onClick={this.onEditClick}>
              Edit Current Image
            </button>
            <button className="OrangeButton" type="button" onClick={this.onEmailClick}>
              Email Me Mockups
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
              onExit={this.onExit}
              width={width} height={height}
            />
          ))}
        </div>
      </div>
    );
  }
}
              // ref={ref => this.rfs[item.id] = ref}
