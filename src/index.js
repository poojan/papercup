import React from 'react';
import ReactDOM from 'react-dom';
import Cup from './components/Cup';
import Cups from './components/Cups';
import './index.css';
import ImageDrop from './components/ImageDrop';
import ImageCrop from './components/ImageCrop';
import { Provider, inject, observer } from 'mobx-react';

// import data from './data/womanDrinkingFromDisposableCup';
// import data from './data/8oz';
// import data from './data/woodenTableCloseup';
// import data from './data/handSmartPhone';
import data from './data/rayWhite';
// import data from './data/preparesEspresso';

import CupStore from './stores/CupStore';
import UiStore from './stores/UiStore';

const cupStore = new CupStore(data);
const uiStore = new UiStore();

import DatGui from './components/DatGui';

const Router = observer(({ uiStore }) => (
  <div className="root">
    {uiStore.activeScreen === 'IMAGE_DROP' && <ImageDrop />}
    {uiStore.activeScreen === 'IMAGE_CROP' && <ImageCrop />}
    {uiStore.activeScreen === 'CUPS' && <Cups />}
  </div>
));

ReactDOM.render(
  <Provider
    uiStore={uiStore}
  >
    <Router uiStore={uiStore} />
  </Provider>,
  document.getElementById('root')
);

    // <App store={cupStore} />
    // <DatGui store={cupStore} />
