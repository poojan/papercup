import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import data from './data/womanDrinkingFromDisposableCup';
import CupStore from './stores/CupStore';
const cupStore = new CupStore(data);
import DatGui from './components/DatGui';

ReactDOM.render(
  <div>
    <App store={cupStore} />
    <DatGui store={cupStore} />
  </div>,
  document.getElementById('root')
);
