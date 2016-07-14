import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const TOP = 0;
const BOTTOM = 1;
const MIDDLE = 2;
const LEFT = 3;
const RIGHT = 4;


class CanvasCard extends Component{
  constructor(props){
    super(props);
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    colour: React.PropTypes.string.isRequired,
    shape: React.PropTypes.string.isRequired,
    number: React.PropTypes.string.isRequired,
    background: React.PropTypes.string,
    fill: React.PropTypes.string
  };

  componentDidMount(){
    this.canvas = ReactDOM.findDOMNode(this.myCanvas);
    if (this.canvas.getContext){
      this.ctx = this.canvas.getContext('2d');
      this.drawCard(this.ctx);
    }
  }

  componentDidUpdate(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawCard(this.ctx);
  }

  determineFill(colour, fill, ctx){
    let self = this;
    var fillPattern = "solid";
    if (fill!==undefined){
      fillPattern = fill;
    }
    switch(fillPattern){
      case "solid":
        fillPattern = function(){
        return colour;
      };
        break;
      default:
        fillPattern = function(){
          var img = document.getElementById(self.props.cardId);
          var pattern = ctx.createPattern(img, 'repeat');
          return pattern;
        }
        break;
    }
    return fillPattern;
  }

  determineShape(shape, fillPattern, colour, ctx){
    switch(shape){
      case "square":
        return function(x_pos, y_pos, radius){
          drawRegularPolygon(x_pos, y_pos, radius, 4, Math.PI/4, fillPattern, colour, ctx);
        };
        break;
      case "circle":
        return function(x_pos, y_pos, radius){
          drawRegularPolygon(x_pos, y_pos, radius, 50, 0, fillPattern, colour, ctx); //circle is a 50 sided polygon 
        };
        break;
      case "triangle":
        return function(x_pos, y_pos, radius){
          drawRegularPolygon(x_pos, y_pos, radius, 3, 3*Math.PI/2, fillPattern, colour, ctx);
        }
        break;
      case "hexagon":
        return function(x_pos, y_pos, radius){
          drawRegularPolygon(x_pos, y_pos, radius, 6, 0, fillPattern, colour, ctx);
        }
        break;
      case "star":
        return function(x_pos, y_pos, radius){
          drawStar(x_pos, y_pos, radius, fillPattern, colour, ctx);
        }
        break;
    }
  }

  drawMultiple(drawShapeFunction, num, height, width, radius){
    if (drawShapeFunction === undefined){
      return;
    }
    //the edge objects need to be padded or else objects end up outside the canvas box;
    const pad = 5;
    const positions = [
      [width/2-radius/2, pad], //top
      [width/2-radius/2, height-radius-pad], //bottom
      [width/2-radius/2,height/2-radius/2], //middle
      [pad,height/2-radius/2], //left
      [width-radius-pad,height/2-radius/2] //right
    ];
    let drawPos = [];
    switch (num){
      case '1':
        drawPos.push(positions[MIDDLE]);
        break;
      case '2':
        drawPos.push(positions[TOP]);
        drawPos.push(positions[MIDDLE]);
        break;
      case '3':
        drawPos.push(positions[TOP]);
        drawPos.push(positions[BOTTOM]);
        drawPos.push(positions[MIDDLE]);
        break;
      case '4':
        drawPos.push(positions[TOP]);
        drawPos.push(positions[BOTTOM]);
        drawPos.push(positions[LEFT]);
        drawPos.push(positions[RIGHT]);
        break;
      case '5':
        drawPos = positions.slice();
        break;
    }
    for (let i = 0; i < drawPos.length; i++){
      drawShapeFunction(drawPos[i][0], drawPos[i][1], radius);
    };
  }


  drawCard(ctx){
    const height = this.props.height;
    const width = this.props.width;
    const radius = height/4;
    const colour = this.props.colour;
    let fill = undefined;
    if (this.props.fill){
      fill = this.props.fill;
    }
    let fillPattern = this.determineFill(colour, fill, ctx);
    let shapeFunction = this.determineShape(this.props.shape, fillPattern, colour, ctx);
    this.ctx.lineWidth=1.1;
    this.drawMultiple(shapeFunction, this.props.number, height, width, radius);
  }

  render(){
    return(
      <div>
        <canvas ref={(ref) => this.myCanvas = ref}
                width={this.props.width}
                height={this.props.height}></canvas>
      </div>
    );
  };
}

function drawStar(x_pos, y_pos, radius, fillPattern, colour, ctx){
  let rotation = Math.PI/2*3;
  let outerRadius = radius/2;
  let innerRadius = radius/2-5;
  let spikes = 5;
  let step = Math.PI/spikes;
  let xcenter = x_pos+radius/2;
  let ycenter = y_pos+radius/2;
  let x = xcenter;
  let y = ycenter;
  ctx.beginPath();
  ctx.moveTo(xcenter, ycenter-outerRadius);
  for (let i = 0; i < spikes;i++){
    x = xcenter + Math.cos(rotation)*outerRadius;
    y = ycenter + Math.sin(rotation)*outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = xcenter + Math.cos(rotation)*innerRadius;
    y = ycenter + Math.sin(rotation)*innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  ctx.lineTo(xcenter, ycenter-outerRadius);
  console.log("star fp", fillPattern);
  ctx.fillStyle = fillPattern();
  //          ctx.fillStyle = colour;
  ctx.strokeStyle = colour;
  ctx.fill();
  ctx.stroke();
}

function drawRegularPolygon(x_pos, y_pos, radius, numSides, angleShift, fillPattern, colour, ctx){
  let xcenter = x_pos + radius/2;
  let ycenter = y_pos + radius/2;
  radius = radius/2;
  ctx.beginPath();
  ctx.moveTo(xcenter + radius*Math.cos(numSides*2*Math.PI/numSides+angleShift), ycenter+radius*Math.sin(numSides*2*Math.PI/numSides+angleShift));
  for (let i = 0; i <= numSides; i++){
    ctx.lineTo(xcenter + radius*Math.cos(i*2*Math.PI/numSides+angleShift), ycenter+radius*Math.sin(i*2*Math.PI/numSides+angleShift));
  }
  ctx.fillStyle = fillPattern();
  ctx.strokeStyle = colour;
  ctx.stroke();
  ctx.fill();
}

function glowOnSelect(ctx, selected){
  if (selected){
    ctx.shadowBlur = 3;
    ctx.lineWidth = 2;
    ctx.shadowOffsetX= 4;
    ctx.shadowOffsetY = 2;
  } else {
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.shadowOffsetX= 0;
    ctx.shadowOffsetY = 0;
  }
  ctx.shadowColor = "black";
}

export default CanvasCard;

