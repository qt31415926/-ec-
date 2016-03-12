import {createCards, compareIds} from '../helpers/card_functions';
import * as actions from '../helpers/action_types';

const defaultState = {
  subtypes: 3,
  qualities: ['colour',  'shape', 'number'],
  deck: [],
};

export default function(state = defaultState, action){
  let nextState = {};
  switch (action.type){
    case actions.CARD_SELECTED:
      Object.assign(nextState, state, {
        deck: state.deck.map((card)=>{
          if (card.id===action.id){
            return Object.assign({}, card, {selected: card.selected ? false: true});
          } else return card;
        })
      })
      return nextState;

    case actions.FOUND_GROUP:
      let correct = action.correct;
      let selected = action.selected;
      if (correct){
        let newDeck = state.deck.filter(compareIds(selected));
        Object.assign(nextState, state, {
          deck: newDeck,
        })
        return nextState;
      } 
      return state; 

    case actions.GAME_RESTART:
      Object.assign(nextState, state, {
        deck: createCards(state.qualities, state.subtypes),
      })
      return nextState;

    default:
      Object.assign(nextState, state, {
        deck: createCards(state.qualities, state.subtypes),
      })
      return nextState;
  }
}
