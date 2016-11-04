import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var fillPatternPaths = {
  solid: ['M', 2, 2, 'L', 12, 2, 'L', 12, 12, 'L', 2, 12, 'L', 2, 2]
};

export default class SVGFill extends Component {
  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render(){

  var size = this.props.size;
  var colour = this.props.colour;

  var box = [0,0,size,size].join[' '];

  var pathData = fillPatternPaths['solid'].join(' ');

  var svgStyle = {
    display: 'none'
  }

  return(
    <svg id={this.props.id} style={svgStyle}
      width={size}
      height={size}
      fill={colour}>
      <path d={pathData}/>
    </svg>
  ) 
  }
}
