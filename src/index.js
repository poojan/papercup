import React from 'react';
import ReactDOM from 'react-dom';
import Cups from './components/Cups';
import './index.css';
import ImageDrop from './components/ImageDrop';
import ImageCrop from './components/ImageCrop';
import { Provider, observer } from 'mobx-react';

import UiStore from './stores/UiStore';
const uiStore = new UiStore();

import CupStore from './stores/CupStore';
const cupStore = new CupStore();

const Router = observer(({ uiStore }) => (
  <div className="root">
    {uiStore.activeScreen === 'IMAGE_DROP' && <ImageDrop />}
    {uiStore.activeScreen === 'IMAGE_CROP' && <ImageCrop />}
    {uiStore.activeScreen === 'CUPS' && <Cups />}
  </div>
));

ReactDOM.render(
  <Provider cupStore={cupStore} uiStore={uiStore}>
    <Router uiStore={uiStore} />
  </Provider>,
  document.getElementById('root')
);
