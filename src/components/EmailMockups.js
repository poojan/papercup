import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

@inject('cupStore')
@observer
class CupImage extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.onClickCup = this.onClickCup.bind(this, item.id);
  }

  @action onClickCup(keyId) {
    const { cupStore } = this.props;
    console.log('keyId', keyId);
    cupStore.toggleSelect(keyId);
  }

  render() {
    const { item } = this.props;
    return (
      <div
        onClick={this.onClickCup.bind(this, item.id)}
        className="CupImage"
      >
        <img
          alt={item.id}
          src={item.dataURL}
        />
        {item.selected && <i className="fa fa-check" />}
      </div>
    );
  }
}

@inject('cupStore', 'uiStore')
@observer
export default class EmailMockups extends Component {
  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'CUPS';
  }

  @action onSendClick = () => {
    console.log('onSendClick');
  }

  render() {
    const { cupStore } = this.props;

    return (
      <div>
        <div className="Grid">
          {cupStore.items.map(item => (
            <CupImage
              key={item.id}
              item={item}
            />
          ))}
        </div>
        <div>
          <button className="BlueButton" type="button" onClick={this.onBackClick}>
            Back
          </button>
          <button className="OrangeButton" type="button" onClick={this.onSendClick}>
            Please Send
          </button>
        </div>
      </div>
    );
  }
}
