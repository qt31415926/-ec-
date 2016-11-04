import React, { Component } from 'react'
import './Tutorial.css'
import Card from '../components/card.js'
import SelectionStatus from './SelectionStatus.js'

export default class Tutorial extends Component {
  render() {
    return (
      <div className="tutorial-container">
          <h2>Goal of the game:</h2>
          <p>
            Find as many sets as possible. A set is a group of cards where each different property has all unique or all the same types. Did that make no sense? Here are some examples:
          </p>

        <ExampleSection cards={example1} />
        <ExampleSection cards={example2} />
        <ExampleSection cards={example3} />
        <ExampleSection cards={example4} />
      </div>
    )
  }
}

const ExampleSection = (props) => {
  return (
    <div className="example-section">
      <div className="example-cards">
        {
          props.cards.map((c) => {
            return <Card card={c} />
          })
        }
      </div>
      <div className="example-status">
        <SelectionStatus cards={props.cards} />
      </div>
    </div>
  )
}

const example1 = [
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

const example2 = [
  {
    attributes: {
      colour: "orange",
      shape: "triangle",
      number: "1"
    },
    id: 0,
    selected: true  
  },
  {
    attributes: {
      colour: "orange",
      shape: "circle",
      number: "1"
    },
    id: 0,
    selected: false
  },
  {
    attributes: {
      colour: "blue",
      shape: "triangle",
      number: "1"
    },
    id: 0,
    selected: false
  },
]

const example3 = [
  {
    attributes: {
      colour: "orange",
      shape: "circle",
      number: "2"
    },
    id: 0,
    selected: true  
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
  {
    attributes: {
      colour: "purple",
      shape: "triangle",
      number: "1"
    },
    id: 0,
    selected: false
  },
]

const example4 = [
  {
    attributes: {
      colour: "purple",
      shape: "circle",
      number: "2"
    },
    id: 0,
    selected: true  
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
  {
    attributes: {
      colour: "orange",
      shape: "triangle",
      number: "2"
    },
    id: 0,
    selected: false
  },
]
