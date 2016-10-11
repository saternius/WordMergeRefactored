import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import p from '../Logic/P.js';

export default class HomePage extends Component {
  render() {
    var won = this.props.data.won;
    var dims = Dimensions.get('window');
    var topMsg = won?"YOU BOTH WON!":"YOU BOTH LOST..";
    var bgColor = won?"#1bab16":"#ab151c";
    var pic = this.props.data.player.pic;
    var imageStyle = [{top:p.h(15),width:p.w(180),height:p.h(180), borderRadius:p.w(30), borderWidth:p.w(1),borderColor:"#003838"}];
    var textStyle = [{fontFamily:"baloo",textShadowColor:"#171f1f",textShadowOffset:{width:p.w(1),height:p.h(1)},textShadowRadius:p.w(10),fontSize:p.h(28),top:p.h(2),color:"#fafafa"}];
    return (
      <View>
        <WallPaper/>
        <View style={{width:dims.width,height:p.h(50),backgroundColor:bgColor, justifyContent:"center",flexDirection:"row"}}>
          <Text style={textStyle}>
            {topMsg}
          </Text>
        </View>

        <View style={{position:"absolute",width:p.w(360),height:p.h(215),top:p.h(50),left:0,backgroundColor:"rgba(3,46,46,.5)"}}>
        </View>

        <View style={{position:"absolute",width:p.w(360),height:p.h(75),top:p.h(265),left:0,backgroundColor:"rgba(3,46,46,.75)"}}>
        </View>

        <View style={{position:"absolute",width:p.w(360),height:p.h(350),top:p.h(340),left:0,backgroundColor:"rgba(3,46,46,.05)"}}>
        </View>

        <Text style={[textStyle,{width:p.w(130),top:p.h(75),right:p.w(15),borderWidth:0,position:"absolute",fontSize:p.h(20),textAlign:"center"}]}>{"Merges with "+this.props.data.player.name}</Text>
        <Text style={[textStyle,{top:p.h(120),right:p.w(15),width:p.w(130),borderWidth:0,position:"absolute",fontSize:p.h(90),textAlign:"center"}]}>{69}</Text>

        <View style={{left:p.w(25)}}>
          <Image style={imageStyle} source={pic}/>
        </View>

        <View style={[{justifyContent:"space-between",top:p.h(150), height:p.h(200)}]} >
          <Button text="Offer Rematch" tint="bright" onclick={()=>{}}/>
          <Button text="+ Add Friend"  onclick={()=>{}}/>
          <Button text="Leave" tint="pale" onclick={()=>{this.props.nav("StartPage")}}/>
        </View>
      </View>
    )
  }
}
