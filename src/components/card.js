import React, {Component} from 'react';
import classNames from 'classnames';
import CanvasCard from './canvas_card.js';
import CanvasFill from './canvas_fill.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Card extends Component{

  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    card: React.PropTypes.shape({
      attributes: React.PropTypes.shape({
        colour: React.PropTypes.string,
        shape: React.PropTypes.string,
        number: React.PropTypes.string,
        background: React.PropTypes.string,
        fill: React.PropTypes.string
      }).isRequired
    }).isRequired
  };


  render(){
    const {selectFunction, selected, card} = this.props;
    const attributes = card.attributes;
    const height = 108;
    const width = 108;

    var clicked = false;
    if (selectFunction != null) clicked = ()=>selectFunction(card.id); //Changes CSS depending if card is selectable or not.

    var cardClass = classNames({
      'cant-select': !clicked,
      'card-container': true,
      'selected': selected
    });

    return (
      <li onClick={clicked}  className={cardClass}>
          <CanvasFill size={5} id={card.id} colour={attributes.colour} fill={attributes.fill}/>
          <CanvasCard width={width}
                      height={height}
                      colour={attributes.colour}
                      shape={attributes.shape}
                      number={attributes.number}
                      fill={attributes.fill}
                      cardId={card.id}
                      selected={false}/>
      </li>
    );
  }
}

export default Card;
