import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var patternPaths = {
  diamond: function(ctx, size, colour){
    ctx.lineTo(0, size);
    ctx.lineTo(size, 0);
    ctx.lineTo(size, size);
    ctx.fillStyle = colour;
    ctx.strokeStyle = colour;
    ctx.stroke();
    ctx.fill();
  },
  stripes: function(ctx, size, colour){
    ctx.quadraticCurveTo(size*2, size*2, size*2+size, size*2+size);
    ctx.strokeStyle = colour;
    ctx.stroke();

  },
  solid: function(){
    return;
  },
  //stripes: function(ctx, size, colour){
    //ctx.lineTo(1.5, 0);
    //ctx.lineTo(1.5, size*2);
    //ctx.lineTo(0, size*2);
    //ctx.lineTo(0, 0);
  //},
  hollow: function(ctx, size, colour){
    return;
  },
  squiggly: function(ctx, size, colour){
    ctx.lineTo(size/4,size);
    ctx.lineTo(size/2,0);
    ctx.lineTo(3*size/4,size);
    ctx.lineTo(size,0);
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = colour;
    ctx.stroke();
  }

}

export default class CanvasFill extends Component {
  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    id: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    fill: React.PropTypes.string,
    colour: React.PropTypes.string
  }

  componentDidMount(){
    this.canvas = ReactDOM.findDOMNode(this.canvasFillObject);
    if (this.canvas.getContext){
      this.ctx = this.canvas.getContext('2d');
      this.drawPattern(this.ctx);
    }
  }
  componentDidUpdate(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawPattern(this.ctx);
  }

  drawPattern(ctx){
    const {colour, size, fill} = this.props;
    ctx.beginPath();
    ctx.moveTo(0,0);
    patternPaths[fill](ctx, size, colour);
  }

  render(){
  var size = this.props.size;
  var colour = this.props.colour;
  var hideStyle = {
    display: 'none'
  }

  return(
      <canvas style={hideStyle} ref={(ref)=> this.canvasFillObject = ref} 
              width={size}
              height={size}
              id={this.props.id}
      ></canvas>
    ) 

  }
}
