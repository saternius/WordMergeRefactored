import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import MyInput from '../Components/MyInput';
import p from '../Logic/P.js';

export default class JoinPage extends Component {
  constructor(props){
    super(props);
    this.joinRoom = ()=>{
      //nothing
    }
  }
  render() {
    return (
      <View>
        <WallPaper/>
        <NavigationBar nav={this.props.nav} back={this.props.back}/>
        <HoverPic pic={require('../images/fivesy.png')} l={p.h(10)} w={p.w(300)} h={p.h(300)}/>
        <View style={this.styles.textViewContainer} >
            <View style = {this.styles.textView}>
              <Text style={this.styles.textStyle}>Enter The Room Code</Text>
            </View>
            <View style = {this.styles.textView}>
              <MyInput type="text" text="Room Code" ref="code" fin={this.joinRoom}/>
            </View>
            <View style = {[this.styles.textView,{top:20}]}>
                <Button text="Join Room" onclick={this.joinRoom}/>
            </View>
        </View>
      </View>
    )
  }

  styles = StyleSheet.create({
    textViewContainer:{
      top:p.h(300),
      justifyContent: 'space-between',
      height:p.h(170)
    },
    textView:{
      top:0,
      bottom:0,
      alignItems:'center'
    },
    textStyle:{
        color:"#abc2c0",
        fontWeight:"bold",
        fontFamily:"Trebuchet",
        textShadowColor:"#171f1f",
        textShadowOffset:{width:1,height:1},
        textShadowRadius:p.w(10),
        fontSize:p.h(20),
      }
  });
}
