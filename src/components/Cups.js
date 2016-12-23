import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import Cup from './Cup';

const deg = rad => rad * Math.PI / 180;

import data1 from '../data/rayWhite';
import data2 from '../data/womanDrinkingFromDisposableCup';
import data3 from '../data/8oz';
import data4 from '../data/woodenTableCloseup';
import data5 from '../data/handSmartPhone';
import data6 from '../data/preparesEspresso';

import CupStore from '../stores/CupStore';

@inject('uiStore')
@observer
export default class Cups extends Component {
  @observable cupStore;
  @observable cupStore1;
  @observable cupStore2;
  @observable cupStore3;
  @observable cupStore4;
  @observable cupStore5;
  @observable cupStore6;

  constructor(props) {
    super(props);

    this.cupStore1 = new CupStore(data1);
    this.cupStore2 = new CupStore(data2);
    this.cupStore3 = new CupStore(data3);
    this.cupStore4 = new CupStore(data4);
    this.cupStore5 = new CupStore(data5);
    this.cupStore6 = new CupStore(data6);
    this.cupStore = this.cupStore3;

    this.onClickCup = this.onClickCup.bind(this);
  }

  componentWillMount() {
    // this.cupStore1.scene.width = 400;
    // this.cupStore1.scene.height = 300;
  }

  @observable interval;
  @action onClickCup(a, b) {
    this.cupStore = a;
    console.log('onClickCup');
    // console.log('onClickCup', a, b);

    // console.log('onClickCup', evt.target);
    // this.cupStore = this.props.cupStore;
  }

  render() {
    const { uiStore } = this.props;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

    return (
      <div>
        <div className="MainImage">
          <Cup width={800} height={600} cupStore={this.cupStore} rotate={true} />
        </div>
        <div className="Thumbnails">
          <Cup cupStore={this.cupStore1} onClickCup={this.onClickCup} />
          <Cup cupStore={this.cupStore2} onClickCup={this.onClickCup} />
          <Cup cupStore={this.cupStore3} onClickCup={this.onClickCup} />
          <Cup cupStore={this.cupStore4} onClickCup={this.onClickCup} />
          <Cup cupStore={this.cupStore5} onClickCup={this.onClickCup} />
          <Cup cupStore={this.cupStore6} onClickCup={this.onClickCup} />
        </div>
      </div>
    );
  }
}
