import _ from 'lodash';

var allQualities = {
  colour: ['blue', 'orange', 'purple', 'red', 'green'],
  shape: ['square', 'circle', 'triangle', 'hexagon', 'star'],
  number: ['1', '2', '3', '4','5'],
  fill: ['hollow', 'solid', 'stripes', 'diamond', 'squiggly']
  //background: ['empty', 'earth', 'air', 'fire', 'water']
}

export function createCards(qualities, subtypes){
  let cards = [];
  let total = Math.pow(subtypes, qualities.length);
  const currQualities = {}
  for (const key in allQualities) {
    if (qualities.includes(key)) {
      currQualities[key] = allQualities[key].slice(0, subtypes)
    }
  }
  let keys = Object.keys(currQualities);
  let attrs = cartesianProduct(currQualities);
  attrs = _.shuffle(attrs);
  attrs = attrs.map((attr)=>{
    return _.zipObject(keys, attr);
  });

  for (let i = 0; i < total; i++){
    cards.push({
      id: i,
      attributes: attrs[i]
    });
  }
  return cards;
}

function cartesianProduct(argument){
  return _.reduce(argument, function(a, b) {
    return _.flatten(_.map(a, function(x) {
      return _.map(b, function(y) {
        return x.concat([y]);
      });
    }), false);
  }, [ [] ]);
}



export function verify(cards){
  let attrTypes = Object.keys(cards[0].attributes);
  for (let i = 0; i < attrTypes.length; i++){
    let arr = []; 
    for (let j = 0; j < cards.length; j++){
      arr.push(cards[j].attributes[attrTypes[i]]);
    }
    if (!(Unique(arr)||Equality(arr))){
      return false;
    }
  }
  return true;
}

export function Unique(set){
  let s = new Set(set);
  return s.size === set.length ? true : false;
}

export function Equality(set){
  for (let i = 0; i < set.length-1; i++){
    if (set[i] !== set[i+1]){
      return false;
    }
  }
  return true;
}

export function compareIds(list){
  return function(id){
    for (let i = 0; i < list.length; i++){
      if (id.id===list[i]){
        return false;
      }
    }
    return true;
  }
}

export function deckFilter(deck) {
}

export function selectCard(deck, cardId) {
  const cardIndex = deck.findIndex((card) => card.id === cardId)
  const oldCard = deck[cardIndex]
  const newCard = { ...oldCard, selected: oldCard.selected ? false: true} 
  deck[cardIndex] = newCard;
  return deck;
}

// Swaps the cards to be removed with unseen cards, then removes the swapped cards.
// Problems: Careful case where there are less cards in the deck than the max limit visible
export function removeCards(deck, cardsToRemove, numVisible) {
  let toRemoveIndices= []
  let numRemoved = cardsToRemove.length;
  for (let i = 0; i < deck.length; i++) {
    if (cardsToRemove.includes(deck[i].id)) {
      toRemoveIndices.push(i)
    }
  }
  // Swap the cards that are to be removed with the next available cards
  // If there are not enough cards left to swap, simply filter them out:
  if (numVisible < deck.length) {
    let newDeck = [...deck];
    for (let i = 0; i < numRemoved; i++) {
      let n = toRemoveIndices[i];
      let temp = newDeck[numVisible+i];
      newDeck[numVisible+i] = deck[n]
      newDeck[n] = temp;
    }
    newDeck.splice(numVisible, numRemoved)
    return newDeck
  } else {
    return deck.filter((card) => {
      if (cardsToRemove.includes(card.id)) {
        return false
      } return true
    })
  }
}
