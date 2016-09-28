import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
export default class WaitPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: this.props.mode,
      dots:0,
    }

    this.joinRoom = ()=>{
      //nothing
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
    console.log(this.state.dots);
    var subject = this.props.friend === undefined?"another player":this.props.friend.name
    var hoverPic = this.state.startGame?require('../images/party.png'):require('../images/alone.png');
    return (
      <View>
        <WallPaper/>
        <NavigationBar nav={this.props.nav} back={this.props.back}/>
        <HoverPic pic={hoverPic} l={10} w={250} h={250}/>
        <View style={this.styles.textViewContainer} >
            <View style = {this.styles.textView}>
              <Text style={this.styles.textStyle}>{"Waiting for "+subject+" to join"+dots}</Text>
            </View>
        </View>
      </View>
    )
  }

  styles = StyleSheet.create({
    textViewContainer:{
      top:300,
      justifyContent: 'space-between',
      height:170
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
        textShadowRadius:10,
        fontSize:20,
      }
  });
}
