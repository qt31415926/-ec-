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
  
  let currQualities = _.mapValues(allQualities, (obj)=>{
    return obj.slice(0, subtypes);
  })
  let keys = Object.keys(allQualities);
  let attrs = cartesianProduct(currQualities);
  attrs = _.shuffle(attrs);
  attrs = attrs.map((attr)=>{
    return _.zipObject(keys, attr);
  });

  for (let i = 0; i < total; i++){
    cards.push({
      id: i,
      selected: false,
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
    if (!(unique(arr)||equality(arr))){
      return false;
    }
  }
  return true;
}

function unique(set){
  let s = new Set(set);
  return s.size == set.length ? true : false;
}

function equality(set){
  for (let i = 0; i < set.length-1; i++){
    if (set[i]!=set[i+1]){
      return false;
    }
  }
  return true;
}

export function compareIds(list){
  return function(id){
    for (let i = 0; i < list.length; i++){
      if (id.id==list[i]){
        return false;
      }
    }
    return true;
  }
}
