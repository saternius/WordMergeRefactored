import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity } from 'react-native';


export default class Hangman extends Component {
  constructor(props){
    super(props);
    this.hangImages = [{pic: require('../images/hang_1.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_2.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_3.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_4.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_5.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_6.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_7.png'), width:75, height:70, top:0, left:0},
                      {pic: require('../images/hang_8.png'), width:75, height:70, top:-13, left:10}]
    this.reliefImages = [{pic: require('../images/relief_1.png'), width:70, height:75, top:0, left:0},
                         {pic: require('../images/relief_2.png'), width:70, height:75, top:0, left:0},
                         {pic: require('../images/relief_3.png'), width:70, height:75, top:0, left:0}];
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
    var viewStyle = [{top:275,left:185, width:100,height:100, borderWidth:0, position:"absolute", zIndex:0, justifyContent:"center",flexDirection:"row"}];
    var imageStyle = [{width:img.width,height:img.height,left:img.left,top:img.top,position:"absolute", zIndex:0}];

    return (
    	<View style={viewStyle}>
    	<Image style={imageStyle} source={pic}/>
    	</View>
      )
  }
}
