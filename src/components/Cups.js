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

    this.keyId = "rayWhite";

    this.onClickCup = this.onClickCup.bind(this);
  }

  @action onClickCup(keyId) {
    this.keyId = keyId;
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
          <Cup width={width} height={height} containerId="main" keyId={this.keyId} rotate={true} />
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
