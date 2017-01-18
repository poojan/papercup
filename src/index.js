import React from 'react';
import ReactDOM from 'react-dom';
import Cups from './components/Cups';
import './index.css';
import ImageDrop from './components/ImageDrop';
import ImageUploading from './components/ImageUploading';
import ImageCrop from './components/ImageCrop';
import EmailMockups from './components/EmailMockups';
import { Provider, observer } from 'mobx-react';

import UiStore from './stores/UiStore';
const uiStore = new UiStore();

import data1 from './data/8oz';
import data2 from './data/rayWhite';
import data3 from './data/preparesEspresso';
import data4 from './data/handSmartPhone';
import data5 from './data/disposableCup';
// import data6 from './data/woodenTableCloseup';

import CupStore from './stores/CupStore';

const cupStore = new CupStore([
  data1,
  data2,
  data3,
  data4,
  data5,
  // data6,
]);

const Router = observer(({ uiStore }) => (
  <div className="root">
    {uiStore.activeScreen === 'IMAGE_DROP' && <ImageDrop />}
    {uiStore.activeScreen === 'IMAGE_UPLOADING' && <ImageUploading />}
    {uiStore.activeScreen === 'IMAGE_CROP' && <ImageCrop />}
    {uiStore.activeScreen === 'CUPS' && <Cups />}
    {uiStore.activeScreen === 'EMAIL_MOCKUPS' && <EmailMockups />}
  </div>
));

ReactDOM.render(
  <Provider
    cupStore={cupStore}
    uiStore={uiStore}
  >
    <Router uiStore={uiStore} />
  </Provider>,
  document.getElementById('root')
);
