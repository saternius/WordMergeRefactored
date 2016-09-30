import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
var nav;
export default class TimeBar extends Component {
  constructor(props){
    super(props);
    this.fullTime = 600;
    this.state = {
      timeLeft:this.fullTime,
      timeOut: false
    }
    var tickDown = ()=>{
      var newState = this.state.timeLeft-2;
      this.setState({timeLeft:newState});
      if(this.state.timeLeft <= 0 && !this.state.timeOut) {
        clearInterval(tickDown);
        this.props.outOfTime();
        this.setState({timeOut: true})
      }
    }
    this.resetTimer = ()=>{
      this.setState({timeLeft:this.fullTime})
    }

    setInterval(tickDown,100);
  }

  componentWillUnmount() {
    clearInterval(tickDown);
  }

  render() {
      var dW = Math.floor(360*(this.state.timeLeft/this.fullTime));
      var dStyle = StyleSheet.create({
        fillWidth: {
          width: dW,
        }
      });
      var tW = Dimensions.get("window").width;
      return(
        <View style={[{position:"absolute", width:tW, height:10, top:535, zIndex:1000}]}>
            <View style={{backgroundColor:"white", position:"absolute", width:tW, height:10, zIndex:1}}/>
            <View style={[{backgroundColor:"red", position:"absolute", width:tW, height:10, zIndex:3,},dStyle.fillWidth]}/>
        </View>
        )
      }


}
