import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity,Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';
import p from '../Logic/P.js';
export default class Prompt extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }

  render() {
      var w = Dimensions.get("window").width;
      var h = Dimensions.get("window").height;
      var e = this.state.visible?5:-5;
      return(
        <View style={{position:"absolute",left:w*.10, top:h*.20, width:w*.80+1,height:h*.30+2}} elevation={e}>
          <View style={{position:"absolute", width:w*.80+1,height:h*.30+2,backgroundColor:"#002626", borderRadius:p.w(8)}}></View>
          <View style={{padding:p.w(12),position:"absolute",width:w*.80,height:h*.30,backgroundColor:"#003838", borderRadius:p.w(8)}}>
            <Text style={{left:p.w(-1),textAlign:"center",color:"#e6e8e8", fontFamily:"baloo", textShadowColor:"#171f1f", textShadowOffset:{width:p.w(1),height:p.h(1)}, textShadowRadius:p.w(10), fontSize:p.w(28),}}>
                {this.props.message}
            </Text>
          </View>
          <View style={{flexDirection:"row", justifyContent:"space-between",width:w*.68, left:w*.060,height:p.h(65), top:h*.17}}>
            <Button text="Yes" w={p.w(120)} tint="pale" willKillMe={true} fullWidth={true} onclick={this.props.accept}/>
            <Button text="No" w={p.w(120)} tint="bright" fullWidth={true} onclick={()=>{this.setState({visible:false})}}/>
          </View>
        </View>
        )
      }
}
