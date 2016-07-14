import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCard, restartGame, foundGroup, changeQualities, changeSub, changeVisible } from "../redux/game";
import {bindActionCreators} from 'redux';
import GameBoard from '../components/game_board';
import GameMenu from '../components/game_menu';

function mapStateToProps(state){
  return {
    game: state.game
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({
      selectCard,
      restartGame,
      foundGroup,
      changeQualities,
      changeSub,
      changeVisible
    }, dispatch)
  }
}

class Game extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {game, actions} = this.props;
    return(
    <div className="container">
      <div>
        <GameBoard qualities={game.qualities} subtypes={game.subtypes} deck={game.deck} actions={actions} numVisible={game.numVisible}/>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);