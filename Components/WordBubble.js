import React, { Component, PropTypes } from 'react';
import { View, Text,TouchableWithoutFeedback, TouchableHighlight,Navigator, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import p from '../Logic/P.js';
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
				fontSize:p.w(28),
				shiftSpikeDown:0,
			}

			this.shifted = false;

			this.getBubbleWidth = ()=>{
				return this.bubbleWidth;
			}

			this.measureSize = (event)=>{
  			var {x, y, width, height} = event.nativeEvent.layout;
				if(width>p.w(180)){
					this.setState({fontSize:(this.state.fontSize-4),shiftSpikeDown:(this.state.shiftSpikeDown+5)});
				}
				this.bubbleWidth = width;

			}
	}
	componentDidMount() {
		var startPos = this.state.guest?p.h(-50):p.h(50);
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
		var bubbleStyle = [styles.bubbleStyle,{backgroundColor:this.state.color,borderWidth:0, top:p.h(8)}];
		var bubbleShadow= [styles.bubbleShadow,{backgroundColor:this.state.shadowColor,borderWidth:0,top:p.h(11)}];
		var bubbleTextStyle = [styles.bubbleTextStyle,{top:p.h(2),fontSize:this.state.fontSize,fontFamily:"baloo",fontWeight:"normal"}];
		var containerStyle = [styles.bubbleContainer];
		var bubblePosStyle = this.props.guest?[styles.centerGuestContent]:[styles.centerContent];
		var wordDisp = this.state.hide?"?????":this.props.word;
		var pic = this.state.guest?require('../images/arrowHeadDown.png'):require('../images/arrowHeadUp.png');
		var picStyle = this.state.guest?{
			position:"absolute",
			width:p.w(20),
			height:p.h(20),
			left:p.w(23),
			top:p.h(55-this.state.shiftSpikeDown),
			zIndex:10,
		}:{
			position:"absolute",
			width:p.w(20),
			height:p.h(20),
			left:p.w(23),
			top:p.h(170),
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
      paddingLeft:p.w(10),
      paddingRight:p.w(10),
      paddingTop:0,
      paddingBottom:0,
      borderRadius:p.w(10),
      backgroundColor:"#e69100",

    },
    bubbleShadow:{
      position:"absolute",
      paddingLeft:p.w(10),
      paddingRight:p.w(10),
      paddingTop:0,
      paddingBottom:0,
      borderRadius:p.w(10),
      top:p.h(13),
      left:p.w(2),
      backgroundColor:"#a16000",
  },
  bubbleTextStyle:{
    fontSize:p.w(28),
    fontFamily:"Trebuchet",
    fontWeight:"bold",
  },
  bubbleContainer:{
    position:"absolute",
    width:p.w(180),
    height:p.h(240),
    right:0,
  },
  centerGuestContent:{
    position:"absolute",
    left:0,
    top:0,
    zIndex:999,
    height:p.h(240),
    paddingRight:p.w(10),
    paddingTop:p.h(10),
    paddingBottom:p.h(10),
    paddingLeft:0,
    width:p.w(200),
  },
  centerContent:{
    position:"absolute",
    left:0,
    top:p.h(172),
    zIndex:999,
    height:p.h(70),
    paddingRight:p.w(10),
    paddingTop:p.h(10),
    paddingBottom:p.h(10),
    paddingLeft:0,
    width:p.w(200),
  },

  });
}
