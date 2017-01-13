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
    const { item, idx } = this.props;
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
        {/* idx === 0 && (
          <div className="instruction">
            Click on images to be emailed.
          </div>
        ) */}
      </div>
    );
  }
}

@inject('cupStore', 'uiStore')
@observer
export default class EmailMockups extends Component {
  @observable interest;
  @observable email;
  @observable selectedFiles = [];
  @observable processing = false;
  pageStates = {
    NORMAL: 'NORMAL',
    PROCESSING: 'PROCESSING',
    INVALID: 'INVALID',
    DONE: 'DONE',
  };
  @observable pageState = this.pageStates.NORMAL;

  @action onBackClick = () => {
    const { uiStore } = this.props;
    uiStore.activeScreen = 'CUPS';
  }

  @action onSendClick = () => {
    const { cupStore } = this.props;

    this.selectedFiles = cupStore.items
      .filter(item => item.selected) || [];

    if (!this.email || !this.interest || !this.selectedFiles.length) {
      this.pageState = this.pageStates.INVALID;
      return;
    }

    const files = this.selectedFiles
      // cupStore.items
      // .filter(item => item.selected)
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

  @action onDoneClick = event => {
    this.pageState = this.pageStates.NORMAL;
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
          <div className="Upload" onClick={this.onDoneClick}>
            <div className="processing">
              <div className="BluePanel">
              <p>
              Your designs are<br />
              on their way!
              </p>
              </div>
            </div>
          </div>
        )}
        <div className="Grid">
          <div>
          <div className="TextContainer">
            <div className="text">
              Click on images to be emailed
            </div>
          </div>
          {cupStore.items.map((item, idx) => (
            <CupImage
              key={item.id}
              item={item}
              idx={idx}
            />
          ))}
          </div>
        </div>
        {this.pageState === this.pageStates.INVALID && !this.selectedFiles.length && (
          <div className="Invalid">Please select one or more images</div>
        )}
        <br />
        <form className="Form">
          <div>
            <div className="formInput">

              {this.pageState === this.pageStates.INVALID && !this.interest && (
                <div className="Invalid">Please select an option</div>
              )}

              <select onChange={this.onInterestChange}>
                <option value="">I am interested in custom paper cups for ...</option>
                <option value="hospitality">Café / Hospitality</option>
                <option value="campaign">Event / Marketing Campaign</option>
                <option value="personal">Personal Use</option>
              </select>
            </div>
            <div className="formInput">
              {this.pageState === this.pageStates.INVALID && !this.email && (
                <div className="Invalid">Please enter email</div>
              )}
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
