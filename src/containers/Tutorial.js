import React, { Component } from 'react'
import Card from '../components/card.js'
import SelectionStatus from './SelectionStatus.js'

const guideCards = [
  {
    attributes: {
      colour: "blue",
      shape: "square",
      number: "1"
    },
    id: 0,
    selected: true  
  },
  {
    attributes: {
      colour: "blue",
      shape: "square",
      number: "2"
    },
    id: 0,
    selected: false
  },
  {
    attributes: {
      colour: "blue",
      shape: "square",
      number: "3"
    },
    id: 0,
    selected: false
  },
]

export default class Tutorial extends Component {
  render() {
    return (
      <div>
        <div id="first-example">
          <Card card={guideCards[0]}/>
          <Card card={guideCards[1]}/>
          <Card card={guideCards[2]}/>
        </div>
        <div>
          <SelectionStatus cards={guideCards} />
        </div>
      </div>
    )
  }
}
