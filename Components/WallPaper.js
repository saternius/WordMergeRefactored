import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyComponent from './MyComponent'
export default class WallPaper extends MyComponent {

  constructor(props){
    super(props);
    var dims = Dimensions.get('window');
    this.setDefaultState({
      colors: ["#057d8a","#006666","#006666","#02474f"],
      style: StyleSheet.create({
              myStyle:{
                width:dims.width,
                height:dims.height,
                position:"absolute",
                top:0,
                left:0,
                zIndex:-1,
              }
      }),
      lettersX: new Animated.Value(0),
      lettersY: new Animated.Value(0),
      dispPic: true,
      bgPic: require("../images/letters.png"),
    });
  }

  componentDidMount(){
    if(this.state.dispPic){
      this.goLeft = ()=>{
        Animated.timing(
          this.state.lettersX,
          {
            toValue: -190,
            duration: 50000,
            easing: Easing.linear,
          }
        ).start(this.goRight);
      }

      this.goRight = ()=>{
        Animated.timing(
          this.state.lettersX,
          {
            toValue: 0,
            duration: 50000,
            easing: Easing.linear,
          }
        ).start(this.goLeft);
      }

      this.goLeft();

      this.letXListener = (val)=>{
        this.state.lettersY.setValue(Math.sin(val.value/20)*15);
      }
      this.state.lettersX.addListener(this.letXListener);
    }
  }

  componentWillUnmount(){
    this.state.lettersX.removeAllListeners();
  }

  render() {
    var bgPicAnim = !this.state.dispPic?<Text></Text>:
                          <Animated.View style={[
                            {
                              position:"absolute",
                              width:800,
                              height:1206,
                              top:265,
                              left:0,
                              transform: [
                                {translateX: this.state.lettersX},
                                {translateY: this.state.lettersY},
                              ]
                            }
                          ]}>
                              <Image style={{position:"absolute",width:614,height:486,top:0,left:-20,opacity:.15}} source={this.state.bgPic}/>
                          </Animated.View>;
      return(
              <LinearGradient colors={this.state.colors} style={this.state.style.myStyle}>
                {bgPicAnim}
              </LinearGradient>
        )
      }
}
