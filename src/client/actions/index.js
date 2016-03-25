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

export function foundGroup(correct, selected){
  return{
    type: types.FOUND_GROUP,
    correct,
    selected
  };
}
