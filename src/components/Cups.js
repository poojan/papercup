import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Cup from './Cup';

@inject('uiStore')
@observer
export default class Cups extends Component {
  render() {
    const { uiStore } = this.props;

    if (uiStore.activeScreen !== 'CUPS') { return <div />; }

    return (
      <Cup />
    );
  }
}
