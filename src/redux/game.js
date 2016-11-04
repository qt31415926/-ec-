import {createCards, compareIds, selectCard, removeCards} from '../helpers/card_functions';

const defSubtypes = 3;
const defQualities = ['colour',  'shape', 'number'];
const defVisible = defSubtypes*(defSubtypes+1);

const defaultState = {
  subtypes: defSubtypes,
  qualities: defQualities,
  numVisible: defVisible,
  deck: [],
};

//Action constants

export const CARD_SELECTED = 'CARD_SELECTED';
export const GAME_RESTART = 'GAME_RESTART';
export const FOUND_GROUP = 'FOUND_GROUP';
export const CHANGE_QUALITIES = 'CHANGE_QUALITIES';
export const CHANGE_SUBTYPES = 'CHANGE_SUBTYPES';
export const CHANGE_VISIBLE = 'CHANGE_VISIBLE'; 

//Action creators

export function clickCard(id){
  return {
    type: CARD_SELECTED,
    id: id
  };
}

export function restartGame(){
  return{
    type: GAME_RESTART
  };
}

export function foundGroup(selected){
  return{
    type: FOUND_GROUP,
    selected
  };
}

export function changeQualities(newQualities){
  return{
    type: CHANGE_QUALITIES,
    newQualities
  }
}

export function changeSub(newSubtypes){
  return{
    type: CHANGE_SUBTYPES,
    newSubtypes
  }
}

export function changeVisible(quantity){
  return{
    type: CHANGE_VISIBLE,
    quantity
  }
}

//Reducers

export default function(state = defaultState, action){
  let nextState = {};
  const defaultVisible = state.subtypes*(state.subtypes+1);
  let newNumVisible;
  switch (action.type){
    case CARD_SELECTED:
      Object.assign(nextState, state, {
        deck: selectCard(state.deck, action.id)  
      });
      return nextState;

    case FOUND_GROUP:
      console.log("FOUND GROUP");
      const selected = action.selected;
      newNumVisible = state.numVisible;
      if (state.numVisible > defaultVisible){
        newNumVisible -= state.subtypes;
      }

      const newDeck = removeCards(state.deck, action.selected, newNumVisible)
      Object.assign(nextState, state, {
        deck: newDeck,
        numVisible: newNumVisible,
      });
      return nextState;

    case GAME_RESTART:
      newNumVisible = defaultVisible;
      Object.assign(nextState, state, {
        deck: createCards(state.qualities, state.subtypes),
        numVisible: newNumVisible,
      });
      return nextState;

    case CHANGE_QUALITIES:
      const newQualities = action.newQualities;
      Object.assign(nextState, state, {
        deck: createCards(newQualities, state.subtypes),
        qualities: newQualities
      });
      return nextState;

    case CHANGE_VISIBLE:
      console.log(newNumVisible);
      newNumVisible = state.numVisible + action.quantity;
      Object.assign(nextState, state, {
        numVisible: newNumVisible
      });
      return nextState;

    case CHANGE_SUBTYPES:
      const newSubtypes = action.newSubtypes;
      Object.assign(nextState, state, {
        deck: createCards(state.qualities, newSubtypes),
        subtypes: newSubtypes
      });
      return nextState;

    default:
      Object.assign(nextState, state, {
        deck: createCards(state.qualities, state.subtypes),
      });
      return nextState;
  }
}

