import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


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
    const {selected} = this.props;
    this.glowOnSelect(this.ctx, selected);
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawCard(this.ctx);
  }

  determineFill(colour, fill){
    var fillPattern = "solid";
    if (fill!==undefined){
      fillPattern = fill;
    }
    switch(fillPattern){
      case "solid":
        fillPattern = colour;
        break;
      case "stripes":
        let stripes = function(){

        }
        break;
    }

    return fillPattern;
  }

  determineShape(fillPattern, shape, ctx, colour){
    let drawPolygon = function(x_pos, y_pos, radius, numSides, angleShift){
      let xcenter = x_pos + radius/2;
      let ycenter = y_pos + radius/2;
      radius = radius/2;
      ctx.beginPath();
      ctx.moveTo(xcenter + radius*Math.cos(numSides*2*Math.PI/numSides+angleShift), ycenter+radius*Math.sin(numSides*2*Math.PI/numSides+angleShift));
      for (let i = 0; i <= numSides; i++){
        ctx.lineTo(xcenter + radius*Math.cos(i*2*Math.PI/numSides+angleShift), ycenter+radius*Math.sin(i*2*Math.PI/numSides+angleShift));
      }
      ctx.fillStyle = fillPattern;
      ctx.strokeStyle = colour;
      ctx.stroke();
      ctx.fill();
    };
    
    switch(shape){
      case "square":
        return function(x_pos, y_pos, side_length){
          drawPolygon(x_pos, y_pos, side_length, 4, Math.PI/4);
        };
        break;
      case "circle":
        return function(x_pos, y_pos, radius){
          drawPolygon(x_pos, y_pos, radius, 50, 0);
          //ctx.beginPath();
          //ctx.arc(x_pos+radius/2, y_pos+radius/2, radius/2, 0, 2*Math.PI);
          //ctx.fillStyle = fillPattern;
          //ctx.strokeStyle = colour;
          //ctx.fill();
          //ctx.stroke();
        };
        break;
      case "triangle":
        return function(x_pos, y_pos, radius){
          drawPolygon(x_pos, y_pos, radius, 3, 3*Math.PI/2);
        }
        break;
      case "hexagon":
        return function(x_pos, y_pos, radius){
          drawPolygon(x_pos, y_pos, radius, 6, 0);
        }
        break;
      case "star":
        return function(x_pos, y_pos, radius){
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
          ctx.fillStyle = fillPattern;
          ctx.strokeStyle = colour;
          ctx.fill();
          ctx.stroke();
        }
        break;
    }
  }

  drawMultiple(shapeFunction, num, height, width, radius){
    if (shapeFunction === undefined){
      return;
    }
    //the edge objects are padded by 2 pixels
    const pad = 5;
    const positions = [
      [width/2-radius/2, pad], //top
      [width/2-radius/2, height-radius-pad], //bottom
      [width/2-radius/2,height/2-radius/2], //middle
      [pad,height/2-radius/2], //left
      [width-radius,height/2-radius/2] //right
    ];
    let drawPos = [];
    switch (num){
      case '1':
        drawPos.push(positions[2]);
        break;
      case '2':
        drawPos.push(positions[0]);
        drawPos.push(positions[2]);
        break;
      case '3':
        drawPos.push(positions[0]);
        drawPos.push(positions[1]);
        drawPos.push(positions[2]);
        break;
      case '4':
        drawPos.push(positions[0]);
        drawPos.push(positions[1]);
        drawPos.push(positions[3]);
        drawPos.push(positions[4]);
        break;
      case '5':
        drawPos = positions.slice();
        break;
    }
    for (let i = 0; i < drawPos.length; i++){
      //console.log("attempting to draw: using", shapeFunction);
      shapeFunction(drawPos[i][0], drawPos[i][1], radius);
    };
  }


  drawCard(ctx){
    
    const height = this.props.height;
    const width = this.props.width;
    const radius = height/4;
    const colour = this.props.colour;
    let fill = undefined;
    if (this.props.hasOwnProperty(fill)){
      fill = this.props.fill
    }
    let fillPattern = this.determineFill(colour, fill);
    let shapeFunction = this.determineShape(fillPattern, this.props.shape, ctx, colour);
    this.drawMultiple(shapeFunction, this.props.number, height, width, radius);
  }

  glowOnSelect(ctx, selected){
    if (selected){
      ctx.shadowBlur = 3;
      ctx.lineWidth = 2;
      ctx.shadowOffsetX= 4;
      ctx.shadowOffsetY = 2;
    } else{
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;
      ctx.shadowOffsetX= 0;
      ctx.shadowOffsetY = 0;

    }
    ctx.shadowColor = "black";
  }

  render(){

    return(
      <canvas ref={(ref) => this.myCanvas = ref}
              width={this.props.width}
              height={this.props.height}></canvas>
    );
  };
}

export default CanvasCard;
