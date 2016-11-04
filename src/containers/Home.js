import React, { Component } from 'react'
import Tutorial from './Tutorial.js'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Pattern matching game!</h1>
        <div>
          <Tutorial />
        </div>
      </div>
    )
  }
}
