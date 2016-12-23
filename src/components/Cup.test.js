import React from 'react';
import ReactDOM from 'react-dom';
import Cup from './Cup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const uiStore = {};
  const cupStore = {};
  ReactDOM.render(<Cup cupStore={cupStore} uiStore={uiStore} />, div);
});
