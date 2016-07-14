import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Game from './containers/game';
import reducers from './redux';
import { Router, hashHistory, Route } from 'react-router';
import Routes from './routes';

const store = applyMiddleware()(createStore);

render(
  <Provider store={store(reducers)}>
    <Routes />
  </Provider>
  , document.querySelector('.container')
);

