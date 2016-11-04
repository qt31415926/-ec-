import * as types from './action_types'

export function selectCard(id){
  return {
    type: types.CARD_SELECTED,
    id: id
  };
}

export function restartGame(){
  return{
    type: types.GAME_RESTART
  };
}

export function foundGroup(selected){
  return{
    type: types.FOUND_GROUP,
    selected
  };
}

export function changeQualities(newQualities){
  return{
    type: types.CHANGE_QUALITIES,
    newQualities
  }
}

export function changeSubtypes(newSubtypes){
  return{
    type: types.CHANGE_SUBTYPES,
    newSubtypes
  }
}
