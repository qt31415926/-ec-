import React, {Component} from 'react';
import classNames from 'classnames';

export default class AnimatedText extends Component {
  constructor (props){
    super(props);
    this.animationDone = this.animationDone.bind(this);
  }

  componentDidMount(){
    const e = this.refs.text;
    e.addEventListener('animationend', this.animationDone);
  }

  animationDone(){
    this.setState({animated: false});
    this.props.callback();
  }

  render(){
    const {text} = this.props;
    let animType = ""
    let textStyle = {}; 
    if (text === "wrong"){
      textStyle = {
        color: "#ff3300",
        textAlign: "center"
      };
      animType = "wobble";
    } else if (text === "not enough selected"){
      textStyle = {
        color: "#ff9900",
        textAlign: "center"
      };
      animType = "tada";
    }
    const textClass = classNames({
      'animated': true,
      [`${animType}`]: true
    })
    return (
      <div>
        <h3 ref="text" className={textClass} style={textStyle}>
          {text} 
        </h3>
      </div>
    );
  }

}
