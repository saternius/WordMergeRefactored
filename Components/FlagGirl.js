import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing } from 'react-native';

export default class FlagGirl extends Component {
  constructor(props){
    super(props);
    this.flagImages = [{pic: require('../images/flagHolder_1.png'), width:75, height:90, top:20, left:42},
                      {pic: require('../images/flagHolder_2.png'), width:75, height:90, top:20, left:42},
                      {pic: require('../images/flagHolder_3.png'), width:75, height:90, top:20, left:42},
                      {pic: require('../images/flagHappy.png'), width:75, height:90, top:20, left:42}
                      ]
    this.state = {
      sprite:this.flagImages,
      frame:0,
      opacity:new Animated.Value(0),
      yShift:new Animated.Value(90),
    }

    this.hide = ()=>{
      Animated.timing(
        this.state.yShift,
        {
          toValue: 90,
          duration: 400,
        }
      ).start();
    }

    this.appear = ()=>{
      Animated.timing(
        this.state.yShift,
        {
          toValue: 0,
          duration: 400,
        }
      ).start();
    }

    this.flagTick = 0;
    this.wave = ()=>{
        this.flagTick++;
        this.setState({frame:((this.flagTick%2)+1)})
    }

    this.startWaving = ()=>{
      setInterval(this.wave,300);
    }
  }

  render() {
    var img = this.state.sprite[this.state.frame];
    var pic = img.pic;
    var viewStyle = [{top:527,left:245, width:150,height:100, position:"absolute", zIndex:1100, justifyContent:"center",flexDirection:"row"}];
    var imageStyle = [{width:img.width,height:img.height,left:img.left,top:img.top,position:"absolute", zIndex:0}];

    return (
      <Animated.View style={[viewStyle,
        {

          transform: [
            {translateX: 0},
            {translateY: this.state.yShift}
          ]
        }
      ]}>
    	<Image elevation={10} style={imageStyle} source={pic}/>
    	</Animated.View>
      )
  }
}
