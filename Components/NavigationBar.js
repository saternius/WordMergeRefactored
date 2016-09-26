import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class NavigationBar extends Component {

  render() {
    var colours = ["#004647","#013b3b"];
    if(this.props.hideBack==undefined){
      return (
        <LinearGradient colors={colours} style={{width:360,height:55,position:"relative"}}>
        <TouchableOpacity style={{width:100,height:50}} onPress={()=>{console.log("TODO")}}>
          <Image style={{height:30,width:30,left:10,top:12,position: "absolute",zIndex: 5}} source={require('../images/backArrow.png')}/>
        </TouchableOpacity>
          <Image style={{right:20, top:9, height:40, width:250, position: "absolute"}} source={require('../images/title.png')}/>
        </LinearGradient>
      )
    }else{
      return(
          <LinearGradient colors={colours} style={{alignItems:'center', width:360, height:55}}>
            <Image style={{top:9, left:10, height:40, width:250}} source={require('../images/title.png')}/>
          </LinearGradient>
      )
    }

  }
}
