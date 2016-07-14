import React, { Component } from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import Game from './containers/game';
import GameBoard from './components/game_board';
import HowToPlay from './pages/how_to_play';

const routes = (
  <Route path="/" component={ Game }>
    <IndexRoute component={ GameBoard } />
    <Route path="help" component={ HowToPlay } />
  </Route>
);

export default class Routes extends Component {
  render(){
    return (
      <Router history={ hashHistory }>{ routes }</Router>
    );
  }
}

