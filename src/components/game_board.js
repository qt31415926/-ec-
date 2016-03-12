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
      selected: [],
      showFeedback: "none"
    }

    this.attemptFind = this.attemptFind.bind(this);
    this.increaseVisibleCards = this.increaseVisibleCards.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.visualFeedback = this.visualFeedback.bind(this);
    this.selectCard = this.selectCard.bind(this);
  }

  selectCard(id){
    const {selected} = this.state;
    let index = selected.indexOf(id);
    let newSelected = selected.slice();
    if (index==-1){
      newSelected.push(id);
      this.setState({
        selected: newSelected
      })
    } else {
      newSelected.splice(index);
      this.setState({
        selected: newSelected
      })
    }
  }
  //method that resolves a find attempt
  //does multiple things: passes selected cards to action, can change number of cards shown
  attemptFind(){
    const {selected} = this.state;
    const {deck} = this.props;
    if (selected.length < this.props.subtypes){
      this.setState({
        showFeedback: "not enough"
      })
      return;
    }
    let cardsSelected = deck.filter((card)=>{
      return selected.indexOf(card.id)!=-1;
    })
    if (verify(cardsSelected)){
      this.props.actions.foundGroup(true, selected);
      if (this.state.numShown > this.defaultNum){
        this.setState({
          numShown: this.state.numShown - this.props.subtypes
        });
      };
      this.setState({
        showFeedback: "correct",
        selected: []
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
      numShown: this.defaultNum,
      selected: []
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
    const {selected} = this.state;

    let numSelected = selected.length;

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


        <div className="col-md-10">
          <ul>
            {
              visibleDeck.map(card => 
                        <Card
                          key = {card.id}
                          card = {card}
                          select = {ifMax && (selected.indexOf(card.id)==-1)? null : this.selectCard}
                          selected = {(selected.indexOf(card.id)==-1)? false : true}
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
