import React from 'react'
import { Equality, Unique } from '../helpers/card_functions.js'

function firstLetterCaps(string) {
  return string[0].toUpperCase() + string.substr(1)
}

const UNIQUE = 0;
const EQUIVALENT = 1;
const WRONG = 2;

const messages = [
  "All are unique!",
  "All are equivalent!",
  "Uh oh :("
];

const SelectionStatus = function(props) {
  const results = []
  for (const attr in props.cards[0].attributes) {
    let verified = false
    let set = []
    for (const card of props.cards) {
      set.push(card.attributes[attr])
    }
    let result = ""
    if (Unique(set)) {
      result = UNIQUE;
    } else if (Equality(set)) {
      result = EQUIVALENT;
    } else {
      result = WRONG;
    }
    results.push([firstLetterCaps(attr), result])
  }


  let borderStyle = { padding: "7px", margin: "15px" }

  if (results.find((res) => {
    return res[1] === WRONG
  })) {
    borderStyle.border = "2px solid red"
  } else {
    borderStyle.border = "2px solid green"
  }

  return (
    <div style={borderStyle}>
      {
        results.map((attr) => {
          const color = attr[1] === UNIQUE || attr[1] === EQUIVALENT ? "green" : "red"
          return (
            <p>{attr[0]}: <strong style={{ color }}>{messages[attr[1]]}</strong></p>
          )
        })
      }
    </div>
  )
}

export default SelectionStatus 
