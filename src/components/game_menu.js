import React, {Component} from 'react';

export default (props)=>{
  return (
    <div className="game-menu">
    <p>
      Rules: Select {props.subtypes} cards.<br/> A valid selection: each attribute = all unique <strong>OR</strong> all conform.
    </p>
      <button className="btn" onClick={props.find}>i found one!</button>
      <br/>
      <button className="btn" onClick={props.restart}>restart game</button>
      <br/>
      <button className="btn" onClick={props.showMore}>help, i need more cards</button>
    </div>

  )
}
