import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import Network from '../Logic/Network';
import p from '../Logic/P.js';

export default class WaitPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: this.props.mode,
      dots:0,
      error:false,
    }

    this.dotMaker = setInterval(() => {
        this.setState({dots:(this.state.dots+1)});
    }, 500);

    Network.waitForPlayer((con)=>{
      if(con.status==200){
        var nextNav = this.state.mode;
        this.setState({startGame:true});
        setTimeout(()=>{
          this.props.nav(nextNav,con);
        },800)
      }else{
        this.setState({error:true});
      }
    });
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
    var error = this.state.error?"An Error occured..":"";

    var dispText = this.state.startGame?subject+" joined!":"Waiting for "+subject+" to join"+dots;
    return (
      <View>
        <WallPaper/>
        <NavigationBar nav={this.props.nav} back={this.props.back}/>
        <HoverPic pic={hoverPic} l={p.w(30)} w={p.w(280)} h={p.h(250)} vW={p.w(320)} shakeMag={p.w(5)}/>
        <View style={this.styles.textViewContainer} >
            <View style = {this.styles.textView}>
              <Text style={this.styles.textStyle}>{dispText}</Text>
              <Text style={this.styles.textStyle}>{error}</Text>
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
        textShadowOffset:{width:p.w(1),height:p.h(1)},
        textShadowRadius:p.w(10),
        fontSize:p.h(20),
      }
  });
}
