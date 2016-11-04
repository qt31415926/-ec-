import React, { Component } from 'react';
import {Provider} from 'react-redux';
import reducers from './redux';
import {createStore, applyMiddleware} from 'redux';
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import Game from './containers/game.js'
import Home from './containers/Home.js'
import './App.css';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Balls = () => (
  <div> O O</div>
)

const FourOhFour = () => (
  <div> nothing found here </div>
)

const Menu = () => (
  <div> 
    <ul className="menu">
      <li className="menu-item"><Link to="/">Home</Link></li>
      <li className="menu-item"><Link to="/balls">Balls</Link></li>
      <li className="menu-item"><Link to="/single-player">Game</Link></li>
    </ul>
    <Match exactly pattern="/" component={Home}/>
    <Match exactly pattern="/balls" component={Balls}/>
    <Match exactly pattern="/single-player" component={Game}/>
    <Miss component={FourOhFour}/>
  </div>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            {Menu}
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}


export default App;
