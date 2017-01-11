import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import classNames from 'classnames';
import request from 'superagent';
import { BASE_URL } from '../config';

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
  @observable interest;
  @observable email;
  @observable processing = false;
  pageStates = {
    NORMAL: 'NORMAL',
    PROCESSING: 'PROCESSING',
    DONE: 'DONE',
  };
  @observable pageState = this.pageStates.NORMAL;

  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'CUPS';
  }

  @action onSendClick = () => {
    const { cupStore } = this.props;
    const files = cupStore.items
      .filter(item => item.selected)
      .map(item => item.dataURL);
    // console.log('onSendClick', files);
    this.upload(files);
  }

  @action upload = (files) => {
    this.pageState = this.pageStates.PROCESSING;
    request
      .post(`${BASE_URL}/email`)
      .send({
        files,
        email: this.email,
        interest: this.interest,
      })
      .end((err, res) => {
        if (err) {
          console.log('err', err);
        }
        console.log('res', res);
        this.pageState = this.pageStates.DONE;
        // setTimeout(() => {
        // }, 1000);
      });
  }

  @action onInterestChange = event => {
    console.log(event.target.value);
    this.interest = event.target.value;
  }

  @action onEmailChange = event => {
    this.email = event.target.value;
  }

  render() {
    const { cupStore } = this.props;

    return (
      <div>
        {this.pageState === this.pageStates.PROCESSING && (
          <div className="Upload">
            <div className="processing">
              <div className="BluePanel">
              <p>
                Processing ...
              </p>
              </div>
            </div>
          </div>
        )}
        {this.pageState === this.pageStates.DONE && (
          <div className="Upload">
            <div className="processing">
              <div className="BluePanel">
              <p>
              Your designs are now on <br />
              their way to you!
              </p>
              </div>
            </div>
          </div>
        )}
        <div className="Grid">
          <div>
          {cupStore.items.map(item => (
            <CupImage
              key={item.id}
              item={item}
            />
          ))}
          </div>
        </div>
        <form className="Form">
          <div>
            <h4>Click on the mock-ups you'd like emailed to you:</h4>
            <div className="formInput">
              <select onChange={this.onInterestChange}>
                <option value="">I am interested in custom paper cups for ...</option>
                <option value="hospitality">Café / Hospitality</option>
                <option value="campaign">Event / Marketing Campaign</option>
                <option value="personal">Personal Use</option>
              </select>
            </div>
            <div className="formInput">
              <input type="text" placeholder="Enter email address"
                onChange={this.onEmailChange}
              />
            </div>
          </div>
          <div>
            <button className="BlueButton" type="button" onClick={this.onBackClick}>
              Back
            </button>
            <button className="OrangeButton" type="button" onClick={this.onSendClick}>
              Please Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}
