import React from 'react';

export default (props)=>{
  let sets = props.score !== 1 ? "sets" : "set";
  return (
    <div className="game-menu">
    <p>
      You found: {props.score} {sets}!
    </p>
      <button className="btn" onClick={props.find}>i found one!</button>
      <br/>
      <button className="btn" onClick={props.restart}>restart game</button>
      <br/>
      <button className="btn" onClick={props.showMore}>help, i need more cards</button>
    </div>

  )
}
