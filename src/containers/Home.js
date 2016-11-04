import React, { Component } from 'react'
import Tutorial from './Tutorial.js'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Pattern matching game!</h1>
        <div>
          <h2>Goal of the game:</h2>
          <p>
            Find as many sets as possible. A set is a group of cards where each different property has all unique or all the same types. Did that make no sense? Here are some examples:
          </p>
          <Tutorial />
        </div>
      </div>
    )
  }
}
