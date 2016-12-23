import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Cup from './Cup';

import data1 from '../data/rayWhite';
import data2 from '../data/womanDrinkingFromDisposableCup';
import data3 from '../data/8oz';
import data4 from '../data/woodenTableCloseup';
import data5 from '../data/handSmartPhone';
import data6 from '../data/preparesEspresso';

import CupStore from '../stores/CupStore';
const cupStore1 = new CupStore(data1);
const cupStore2 = new CupStore(data2);
const cupStore3 = new CupStore(data3);
const cupStore4 = new CupStore(data4);
const cupStore5 = new CupStore(data5);
const cupStore6 = new CupStore(data6);

@inject('uiStore')
@observer
export default class Cups extends Component {
  render() {
    const { uiStore } = this.props;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

    return (
      <div>
        <Cup cupStore={cupStore1} />
        <Cup cupStore={cupStore2} />
        <Cup cupStore={cupStore3} />
        <Cup cupStore={cupStore4} />
        <Cup cupStore={cupStore5} />
        <Cup cupStore={cupStore6} />
      </div>
    );
  }
}
