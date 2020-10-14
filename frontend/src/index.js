import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import actionCable from 'actioncable'

const store = createStore(rootReducer,applyMiddleware(thunk))

const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:8000/cable')

ReactDOM.render(
    <Provider store={ store }>
      <App cableApp={CableApp} />
    </Provider>
  ,
  document.getElementById('root')
);
