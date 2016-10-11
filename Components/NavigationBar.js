import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import p from '../Logic/P.js';

export default class NavigationBar extends Component {

  render() {
    var dims = Dimensions.get("window");
    var colours = ["#004647","#013b3b"];
    if(this.props.back!==undefined){
      return (
        <LinearGradient colors={colours} style={{width:dims.width,height:p.h(55),position:"relative"}}>
        <TouchableOpacity style={{width:p.w(100),height:p.h(50)}} onPress={this.props.back}>
          <Image style={{height:p.h(30),width:p.w(30),left:p.w(10),top:p.h(12),position: "absolute",zIndex: 5}} source={require('../images/backArrow.png')}/>
        </TouchableOpacity>
          <Image style={{right:p.w(20), top:p.h(9), height:p.h(40), width:p.w(250), position: "absolute"}} source={require('../images/title.png')}/>
        </LinearGradient>
      )
    }else{
      return(
          <LinearGradient colors={colours} style={{alignItems:'center', width:dims.width, height:p.h(55)}}>
            <Image style={{top:p.h(9), left:p.w(10), height:p.h(40), width:p.w(250)}} source={require('../images/title.png')}/>
          </LinearGradient>
      )
    }

  }
}
