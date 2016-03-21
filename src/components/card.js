import React, {Component} from 'react';
import classNames from 'classnames';
import CanvasCard from './canvas_card.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Card extends Component{

  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    card: React.PropTypes.shape({
      attributes: React.PropTypes.shape({
        colour: React.PropTypes.string.isRequired,
        shape: React.PropTypes.string.isRequired,
        number: React.PropTypes.string.isRequired,
        background: React.PropTypes.string,
        fill: React.PropTypes.string
      }).isRequired
    }).isRequired
  };


  render(){
    const {select, selected, card} = this.props;
    const attributes = card.attributes;
    const height = 108;
    const width = 108;

    var clicked = false;
    if (select != null) clicked = ()=>select(card.id);

    var cardClass = classNames({
      'cant-select': !clicked,
      'card-container': true,
      'selected': selected
    });

    return (
      <li onClick={clicked}  className={cardClass}>
          <CanvasCard width={width}
                      height={height}
                      colour={attributes.colour}
                      shape={attributes.shape}
                      number={attributes.number}
                      selected={false}/>
      </li>
    );
  }
}

export default Card;
