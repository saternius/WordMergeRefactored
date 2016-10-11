import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import Network from '../Logic/Network';
import p from '../Logic/P.js';

export default class MakePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: this.props.mode,
      roomCode:Network.genRoom(this.props.mode),
    }

    this.dotMaker = setInterval(() => {
        this.setState({dots:(this.state.dots+1)});
    }, 500);
  }

  componentWillUnmount(){
    clearInterval(this.dotMaker);
  }


  render() {
    var dots = "";
    for(var i=0; i<this.state.dots%5;i++){
      dots+=".";
    }
    var subject = this.props.friend === undefined?"another player":this.props.friend.name
    var hoverPic = this.state.startGame?require('../images/party.png'):require('../images/alone.png');
    return (
      <View>
        <WallPaper/>
        <NavigationBar nav={this.props.nav} back={this.props.back}/>
        <HoverPic pic={hoverPic} l={p.w(10)} w={p.w(250)} h={p.h(250)}/>
        <View style={this.styles.textViewContainer} >
            <View style = {this.styles.textView}>
              <Text style={this.styles.textStyle}>{"Room Code"}</Text>
              <Text style={[this.styles.textStyle,{fontSize:p.h(50)}]}>{this.state.roomCode}</Text>
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
