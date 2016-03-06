import React, {Component} from 'react';
import Card from './card';
import GameMenu from './game_menu';
import {verify} from '../helpers/card_functions';
import AnimatedText from './animated_text';

class GameBoard extends Component{
  constructor(props){
    super(props);
    console.log("gameboard props", props);
    this.defaultNum =  this.props.subtypes*(this.props.subtypes+1);

    this.state={
      numShown: this.defaultNum,
      showFeedback: "none"
    }

    this.attemptFind = this.attemptFind.bind(this);
    this.increaseVisibleCards = this.increaseVisibleCards.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.visualFeedback = this.visualFeedback.bind(this);
  }

  //method that resolves a find attempt
  //does multiple things: passes selected cards to action, can change number of cards shown
  attemptFind(){
    let selected = [];
    for (let i = 0; i < this.props.deck.length; i++){
      if (this.props.deck[i].selected){
        selected.push(this.props.deck[i]);
      }
    }
    if (selected.length < this.props.subtypes){
      this.setState({
        showFeedback: "not enough"
      })
      return;
    }
    if (verify(selected)){
      this.props.actions.foundGroup(true, selected);
      if (this.state.numShown > this.defaultNum){
        this.setState({
          numShown: this.state.numShown - this.props.subtypes
        });
      };
      this.setState({
        showFeedback: "correct"
      })
    }else {
      this.props.actions.foundGroup(false, selected);
      this.setState({
        showFeedback: "wrong"
      })
    }
  }

  //increases the number of cards shown
  increaseVisibleCards(){
    this.setState({
      numShown: this.state.numShown+this.props.subtypes
    })
  }

  restartGame(){
    this.setState({
      numShown: this.defaultNum
    })
    this.props.actions.restartGame();
  }

  visualFeedback(){
    if (this.state.showFeedback === "not enough"){
      return(
        <AnimatedText callback={()=>this.setState({showFeedback:"none"})} text="not enough selected" />
      );
    } else if (this.state.showFeedback === "wrong"){
      return(
        <AnimatedText callback={()=>this.setState({showFeedback:"none"})} text="wrong" />
      ); 
    } 
  }
  
  render(){
    const {deck, actions, subtypes} = this.props;

    let numSelected = 0;
    for (let i = 0; i < deck.length; i++){
      if (deck[i].selected){
        numSelected++;
      } 
    };
    let ifMax = numSelected == subtypes ? true : false;
    let visibleDeck = deck.slice(0, this.state.numShown);


    return(
      <div>
        <div className="col-md-2">
          <div className="row">
            <GameMenu subtypes={subtypes} find={this.attemptFind} deck={visibleDeck} restart={this.restartGame} showMore={this.increaseVisibleCards}/>
          </div>
          <div className="row">
            {this.visualFeedback()}
          </div>
        </div>


        <div className="col-md-9">
          <ul>
            {
              visibleDeck.map(card => 
                        <Card
                          key = {card.id}
                          card = {card}
                          select = {ifMax && !card.selected ? null : actions.selectCard}
                          />
                      )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default GameBoard;
