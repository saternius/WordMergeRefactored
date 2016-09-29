import React, { Component, PropTypes } from 'react';
import { View, Text,TouchableWithoutFeedback, TouchableHighlight,Navigator, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default class WordBubble extends Component {
	constructor(props){
			super(props);

			this.state = {
				x:this.props.x,
				y:this.props.y,
				fresh:this.props.fresh,
				xShift: new Animated.Value(0),
				yShift: new Animated.Value(0),
				color:this.props.color,
				shadowColor:this.props.shadowColor,
				hide: this.props.hide,
				guest:this.props.guest,
				shifted:false,
				fontSize:28,
				shiftSpikeDown:0,
			}

			this.shifted = false;

			this.getBubbleWidth = ()=>{
				return this.bubbleWidth;
			}

			this.measureSize = (event)=>{
  			var {x, y, width, height} = event.nativeEvent.layout;
				if(width>180){
					this.setState({fontSize:(this.state.fontSize-4),shiftSpikeDown:(this.state.shiftSpikeDown+5)});
				}
				this.bubbleWidth = width;

			}
	}
	componentDidMount() {
		var startPos = this.state.guest?-50:50;
		this.state.yShift.setValue(startPos);
		Animated.spring(
		 this.state.yShift,
		 {
			 toValue: this.state.y,
			 friction: 6,
		 }
		).start();
	}

  render() {
    var styles = this.styles;
		var bubbleStyle = [styles.bubbleStyle,{backgroundColor:this.state.color}];
		var bubbleShadow= [styles.bubbleShadow,{backgroundColor:this.state.shadowColor}];
		var bubbleTextStyle = [styles.bubbleTextStyle,{top:2,fontSize:this.state.fontSize,fontFamily:"baloo",fontWeight:"normal"}];
		var containerStyle = [styles.bubbleContainer];
		var bubblePosStyle = this.props.guest?[styles.centerGuestContent]:[styles.centerContent];
		var wordDisp = this.state.hide?"?????":this.props.word;
		var pic = this.state.guest?require('../images/arrowHeadDown.png'):require('../images/arrowHeadUp.png');
		var picStyle = this.state.guest?{
			position:"absolute",
			width:20,
			height:20,
			left:23,
			top:55-this.state.shiftSpikeDown,
			zIndex:10,
		}:{
			position:"absolute",
			width:20,
			height:20,
			left:23,
			top:170,
			zIndex:10,
		};

	  var spike=this.props.spike?<View><Image style={picStyle} source={pic}/></View>:<View></View>;

    return (
			<Animated.View style={[containerStyle,
				{
          transform: [
            {translateX: this.state.xShift},
						{translateY: this.state.yShift}
          ]
        }
			]}>
	    	<View style={bubblePosStyle}>
					<View onLayout={this.measureSize} style={bubbleShadow} elevation={3}>
						<Text style={bubbleTextStyle}>{wordDisp}</Text>
					</View>

					<View style={bubbleStyle} elevation={4}>
		    		<Text style={bubbleTextStyle}>{wordDisp}</Text>
		    	</View>
	    	</View>

				{spike}
			</Animated.View>
      )
  }

  styles = StyleSheet.create({
    bubbleStyle:{
      position:"absolute",
      paddingLeft:10,
      paddingRight:10,
      paddingTop:0,
      paddingBottom:0,
      borderRadius:10,
      backgroundColor:"#e69100",

    },
    bubbleShadow:{
      position:"absolute",
      paddingLeft:10,
      paddingRight:10,
      paddingTop:0,
      paddingBottom:0,
      borderRadius:10,
      top:13,
      left:2,
      backgroundColor:"#a16000",
  },
  bubbleTextStyle:{
    fontSize:28,
    fontFamily:"Trebuchet",
    fontWeight:"bold",
  },
  bubbleContainer:{
    position:"absolute",
    width:180,
    height:240,
    right:0,
  },
  centerGuestContent:{
    position:"absolute",
    left:0,
    top:0,
    zIndex:999,
    height:240,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    width:200,
  },
  centerContent:{
    position:"absolute",
    left:0,
    top:172,
    zIndex:999,
    height:70,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:0,
    width:200,
  },

  });
}
