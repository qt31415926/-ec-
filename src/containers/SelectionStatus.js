import React from 'react'
import { Equality, Unique } from '../helpers/card_functions.js'

function firstLetterCaps(string) {
  return string[0].toUpperCase() + string.substr(1)
}

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
      result = "All are unique!"
    } else if (Equality(set)) {
      result = "All are equivalent!"
    } else {
      result = "Uh oh :("
    }
    results.push([firstLetterCaps(attr), result])
  }

  return (
    <div>
      {
        results.map((attr) => {
          return (
            <p>{attr[0]}: {attr[1]}</p>
          )
        })
      }
    </div>
  )
}

export default SelectionStatus 
