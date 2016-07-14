import React from 'react';
import Card from '../components/card.js';

const instructionalCards = [
  {
    id: 9999,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'circle',
      number:'1',
      fill:'solid'
    }
  },
  {
    id: 10000,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'circle',
      number:'2',
      fill:'solid'
    }
  },
  {
    id: 10001,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'circle',
      number:'3',
      fill:'solid'
    }
  },
  {
    id: 10002,
    selected: true,
    attributes: {
      colour: 'yellow',
      shape:'square',
      number:'1',
      fill:'stripes'
    }
  },
  {
    id: 10003,
    selected: true,
    attributes: {
      colour: 'purple',
      shape:'triangle',
      number:'2',
      fill:'hollow'
    }
  },
  {
    id: 10004,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'circle',
      number:'3',
      fill:'solid'
    }
  },
  {
    id: 10005,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'square',
      number:'2',
      fill:'solid'
    }
  },
  {
    id: 10006,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'triangle',
      number:'2',
      fill:'hollow'
    }
  },
  {
    id: 10007,
    selected: true,
    attributes: {
      colour: 'blue',
      shape:'circle',
      number:'2',
      fill:'stripes'
    }
  }
];

export default (props)=>{
  return(
    <div className="col-md-6 row">
      <p> Here are examples of valid sets: </p>
      <div className="row">
        <Card card={instructionalCards[0]} selected={true}/>
        <Card card={instructionalCards[1]} selected={true}/>
        <Card card={instructionalCards[2]} selected={true}/>
      </div>
       <div className="row">
        <Card card={instructionalCards[3]} selected={true}/>
        <Card card={instructionalCards[4]} selected={true}/>
        <Card card={instructionalCards[5]} selected={true}/>
      </div>
      <div className="row">
        <Card card={instructionalCards[6]} selected={true}/>
        <Card card={instructionalCards[7]} selected={true}/>
        <Card card={instructionalCards[8]} selected={true}/>
      </div>

    </div>
  );
}


