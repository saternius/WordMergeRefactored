import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default class Flasher extends Component {
  constructor(props){
    super(props);
    this.state = {
      colorShift:new Animated.Value(300),
      flashState:['rgba(255, 0, 0, 1)','rgba(201, 245, 245, 1)'],
    }

    this.flashFailure = ()=>{
      this.setState({flashState:['rgba(255, 0, 0, 1)','rgba(201, 245, 245, 1)']});
      this.flash();
    }

    this.flashSuccess = ()=>{
      this.setState({flashState:['rgba(0, 255, 0, 1)','rgba(201, 245, 245, 1)']});
      this.flash();
    }

    this.flash = ()=>{
      this.state.colorShift.setValue(0);
      Animated.timing(
         this.state.colorShift,
         {
           toValue: 300,
           duration:800,
         }
       ).start();
    }
  }

  render() {
      var color = this.state.colorShift.interpolate({
          inputRange: [0, 300],
          outputRange: this.state.flashState
      });
      var colours = ["transparent","transparent"];
      var dims = Dimensions.get('window');
      return(
        <Animated.View style = {[{
          		flex:1,
          		alignItems:"center",
              position: "relative",backgroundColor:"#c2eded",
              width:dims.width,
              height:dims.height,
              position:"absolute",
              backgroundColor:"#c9f5f5",
              zIndex:0
          },
          {
              backgroundColor:color
          }
        ]}>
        </Animated.View>
        )
      }
}
