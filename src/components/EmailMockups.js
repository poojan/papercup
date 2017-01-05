import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import Cup from './Cup';

@inject('cupStore')
@observer
export default class EmailMockups extends Component {
  @action onClickCup(keyId) {
    console.log('keyId', keyId);
  }

  render() {
    const { cupStore } = this.props;

    return (
      <div className="Grid">
        {cupStore.items.map(item => (
          <Cup
            key={item.id}
            containerId={item.id}
            keyId={item.id}
            width={200 * 1.5}
            height={150 * 1.5}
            onClickCup={this.onClickCup}
          />
        ))}
      </div>
    );
  }
}
