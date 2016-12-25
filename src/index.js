import React from 'react';
import ReactDOM from 'react-dom';
import Cups from './components/Cups';
import './index.css';
import ImageDrop from './components/ImageDrop';
import ImageCrop from './components/ImageCrop';
import { Provider, observer } from 'mobx-react';

import UiStore from './stores/UiStore';
const uiStore = new UiStore();

import data1 from './data/rayWhite';
import data2 from './data/womanDrinkingFromDisposableCup';
import data3 from './data/8oz';
import data4 from './data/woodenTableCloseup';
import data5 from './data/handSmartPhone';
import data6 from './data/preparesEspresso';

import CupStore from './stores/CupStore';
// const cupStore = new CupStore();

import CupsStore from './stores/CupsStore';
const cupsStore = new CupsStore({
  rayWhite: new CupStore(data1),
  disposable: new CupStore(data2),
  '8oz': new CupStore(data3),
  wooden: new CupStore(data4),
  phone: new CupStore(data5),
  espresso: new CupStore(data6),
});

const Router = observer(({ uiStore }) => (
  <div className="root">
    {uiStore.activeScreen === 'IMAGE_DROP' && <ImageDrop />}
    {uiStore.activeScreen === 'IMAGE_CROP' && <ImageCrop />}
    {uiStore.activeScreen === 'CUPS' && <Cups />}
  </div>
));

ReactDOM.render(
  <Provider
    cupsStore={cupsStore}
    // cupStore={cupStore}
    uiStore={uiStore}
  >
    <Router uiStore={uiStore} />
  </Provider>,
  document.getElementById('root')
);
