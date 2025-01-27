import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import MyComponent from './MyComponent';
import p from '../Logic/P.js';
export default class HoverPic extends MyComponent {
  constructor(props){
    super(props);
    this.setDefaultState({
      clockT:new Animated.Value(Math.floor(Math.random()*6900)),
      imageY:new Animated.Value(0),
      imageRot:new Animated.Value(0),
      shakeMag:p.w(10),
      w:p.w(200),
      h:p.h(200),
      t:p.h(45),
      l:0,
      p:"absolute",
      vW:p.w(360),
      vH:p.h(400),
    });
  }

  componentDidMount(){
    var startAnim = (next)=>{
      Animated.timing(
        this.state.clockT,
        {
          toValue: 1000000,
          duration: 1000000,
          easing: Easing.linear,
        }
      ).start((next==1000000?0:1000000));
    }
    startAnim(1000000);

    this.state.clockT.addListener((val)=>{
      this.state.imageY.setValue(Math.sin(val.value/1500)*this.state.shakeMag);
      this.state.imageRot.setValue(Math.sin((val.value-69)/1000)*this.state.shakeMag);
    });

  }

  componentWillUnmount(){
    this.state.clockT.removeAllListeners();
  }

  render() {
    const spin = this.state.imageRot.interpolate({
      inputRange: [-15, 15],
      outputRange: ['-5deg', '5deg']
    })

    return (
      <View style={{position:this.state.p,top:this.state.t,left:this.state.l,borderWidth:0,width:this.state.vW,height:this.state.vH,justifyContent:"center",flexDirection:"row"}}>
        <Animated.View style={[
          {
            width:this.state.w,
            height:this.state.h,
            top:p.h(20),
            left:0,
            borderWidth:0,
            transform: [
              {translateX: 0},
              {translateY: this.state.imageY},
              {rotate: spin}

            ]
          }
        ]}>
      	   <Image style={{width:this.state.w,height:this.state.h}} source={this.props.pic}/>
        </Animated.View>
      </View>
      )
  }
}
