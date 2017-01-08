import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import Cup from './Cup';
const sf = 1.4;
const width = 200 * sf;
const height = 150 * sf;

@inject('cupStore', 'uiStore')
@observer
export default class EmailMockups extends Component {
  @action onClickCup(keyId) {
    console.log('keyId', keyId);
  }

  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'CUPS';
  }

  render() {
    const { cupStore } = this.props;

    return (
      <div className="Grid">
        {cupStore.items.map(item => (
          <div className="inline" key={item.id}>
            <Cup
              key={item.id}
              containerId={item.id}
              keyId={item.id}
              onClickCup={this.onClickCup}
              width={width}
              height={height}
            />
            <i className="fa fa-check" />
          </div>
        ))}
        <button className="BlueButton" type="button" onClick={this.onBackClick}>
          Back
        </button>
      </div>
    );
  }
}
