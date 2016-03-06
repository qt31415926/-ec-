import React, {Component} from 'react';
import classNames from 'classnames';

class Card extends Component{

  constructor(props){
    super(props);
  }

  drawObject(attrs){
    let height = 25;
    let width = 25;
    let shape = attrs["shape"];
//    console.log("Card: drawObject", shape);
    let colour = attrs["colour"];

    if (shape=='hexagon'){
      return (
        <svg >
        <polygon points="6.25,24.2 18.75,24.2 25,12.1 18.75,0 6.25,0 0,12.1" fill={colour}/>
        </svg>
      );
    }

    if (shape=='star'){
      return (
        <svg >
        <polygon  points="0,22 25,22 12,0" fill={colour}/>
        </svg>
      );
    }

    if (shape=='triangle'){
      return (
        <svg >
          <polygon points="0,22 25,22 12,0" fill={colour}/>
        </svg>
      );
    }
    if (shape=='square'){
      return(
        <svg>
          <rect height={height} width={width} fill={colour}/>
        </svg>
      );
    }
    if (shape=='circle'){
      return(
        <svg>
          <circle cy={height/2} cx={width/2} r={height/2} fill={colour}/>
        </svg>
      );
    }
  }

  drawImage(){
    const {select, card} = this.props;
    let obj = this.drawObject(card.attributes);
    let svgs = [];
    //console.log("in Card, drawImage: cardattrsnumber", card.attributes['number']);
    let numCards = card.attributes['number'] == null? 1 : card.attributes['number'];
    for (let i = 0; i < numCards; i++){
      svgs.push(obj);
    }
    return(
      <div key={card.id}>
        {svgs}
      </div>
    );
  }

  render(){
    const {select, card} = this.props;

    var clicked = false;
    if (select != null) clicked = ()=>select(card.id);

    var cardClass = classNames({
      'cant-select': !clicked,
      'card-container': true,
      'selected': card.selected
    });


    return (
      <li onClick={clicked}  className={cardClass}>
        <div className="inside">
      {this.drawImage()}
        </div>
      
      </li>
    );
  }
}

export default Card;
