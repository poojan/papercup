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
    const { uiStore } = this.props;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

          // <DatGui store={cupStore} />
    return (
      <div>
        <div className="MainImage">
          <Cup width={800} height={600} keyId={this.keyId} rotate={true} />
        </div>
        <div className="Thumbnails">
          <Cup keyId="rayWhite" onClickCup={this.onClickCup} />
          <Cup keyId="disposable" onClickCup={this.onClickCup} />
          <Cup keyId="8oz" onClickCup={this.onClickCup} />
          <Cup keyId="wooden" onClickCup={this.onClickCup} />
          <Cup keyId="phone" onClickCup={this.onClickCup} />
          <Cup keyId="espresso" onClickCup={this.onClickCup} />
        </div>
      </div>
    );
  }
}
