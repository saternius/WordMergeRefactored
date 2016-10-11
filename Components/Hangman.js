import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity } from 'react-native';
import p from '../Logic/P.js';

export default class Hangman extends Component {
  constructor(props){
    super(props);
    this.hangImages = [{pic: require('../images/hang_1.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_2.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_3.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_4.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_5.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_6.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_7.png'), width:p.w(75), height:p.h(70), top:0, left:0},
                      {pic: require('../images/hang_8.png'), width:p.w(75), height:p.h(70), top:p.h(-13), left:p.w(10)}]
    this.reliefImages = [{pic: require('../images/relief_1.png'), width:p.w(70), height:p.h(75), top:0, left:0},
                         {pic: require('../images/relief_2.png'), width:p.w(70), height:p.h(75), top:0, left:0},
                         {pic: require('../images/relief_3.png'), width:p.w(70), height:p.h(75), top:0, left:0}];
    this.state = {
      sprite:this.hangImages,
      frame:0,
    }

    this.gotoHangState = (index)=>{
        console.log("nextState->"+index);
        this.setState({frame:index});
    }
    this.playRelief = (index)=>{
      var reliefFrameRate = 690;
      this.setState({sprite:this.reliefImages,frame:0});
      setTimeout(()=>{
        this.setState({frame:1});
        setTimeout(()=>{
          this.setState({frame:2});
        },reliefFrameRate)
      },reliefFrameRate);
    }
  }

  render() {
    var img = this.state.sprite[this.state.frame];
    var pic = img.pic;
    var viewStyle = [{top:p.h(275),left:p.w(185), width:p.w(100),height:p.h(100), borderWidth:0, position:"absolute", zIndex:0, justifyContent:"center",flexDirection:"row"}];
    var imageStyle = [{width:img.width,height:img.height,left:img.left,top:img.top,position:"absolute", zIndex:0}];

    return (
    	<View style={viewStyle}>
    	<Image style={imageStyle} source={pic}/>
    	</View>
      )
  }
}
