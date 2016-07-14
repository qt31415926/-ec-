import React, {Component} from 'react';
import Card from './card';
import GameMenu from './game_menu';
import {verify} from '../helpers/card_functions';
import AnimatedText from './animated_text';

class GameBoard extends Component{
  constructor(props){
    super(props);
    console.log("gameboard props", props);
    this.defaultNum = this.props.subtypes*(this.props.subtypes+1);

    this.state = {
      selected: [],
      score: 0,
      showFeedback: "none"
    }

    this.attemptFind = this.attemptFind.bind(this);
    this.showMore = this.showMore.bind(this);
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
      newSelected = selected.filter((item)=>{
        return item!=id;
      });
      this.setState({
        selected: newSelected
      })
    }
  }

  //method that resolves a find attempt
  //does multiple things: passes selected cards to ction, can change number of cards shown
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
      this.props.actions.foundGroup(selected);
      this.setState({
        showFeedback: "correct",
        score: this.state.score+1,
        selected: []
      })
    } else {
      this.setState({
        showFeedback: "wrong"
      })
    }
  }

  showMore(){
    const {subtypes} = this.props;
    console.log(this.props.actions.changeVisible);
    this.props.actions.changeVisible((subtypes));
  }

  restartGame(){
    this.setState({
      score: 0,
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
    const {deck, subtypes, numVisible} = this.props;
    const {selected, score} = this.state;

    let numSelected = selected.length;
    console.log(numVisible);

    let ifMax = numSelected == subtypes ? true : false;
    let visibleDeck = deck.slice(0, numVisible);


    return(
      <div>
        <div className="col-md-2">
          <div className="row">
            <GameMenu subtypes={subtypes} find={this.attemptFind} deck={visibleDeck} restart={this.restartGame} showMore={this.showMore} score={score}/>
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
                          selectFunction = {ifMax && (selected.indexOf(card.id)==-1)? null : this.selectCard}
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
