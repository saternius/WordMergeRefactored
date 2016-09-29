import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
export default class HomePage extends Component {
  render() {
    var won = this.props.data.won;
    var dims = Dimensions.get('window');
    var topMsg = won?"YOU BOTH WON!":"YOU BOTH LOST..";
    var bgColor = won?"#1bab16":"#ab151c";
    var pic = this.props.data.player.pic;
    var imageStyle = [{top:15,width:180,height:180, borderRadius:30, borderWidth:1,borderColor:"#003838"}];
    var textStyle = [{fontFamily:"baloo",textShadowColor:"#171f1f",textShadowOffset:{width:1,height:1},textShadowRadius:10,fontSize:28,top:2,color:"#fafafa"}];
    return (
      <View>
        <WallPaper/>
        <View style={{width:dims.width,height:50,backgroundColor:bgColor, justifyContent:"center",flexDirection:"row"}}>
          <Text style={textStyle}>
            {topMsg}
          </Text>
        </View>

        <View style={{position:"absolute",width:360,height:215,top:50,left:0,backgroundColor:"rgba(3,46,46,.5)"}}>
        </View>

        <View style={{position:"absolute",width:360,height:75,top:265,left:0,backgroundColor:"rgba(3,46,46,.75)"}}>
        </View>

        <View style={{position:"absolute",width:360,height:350,top:340,left:0,backgroundColor:"rgba(3,46,46,.05)"}}>
        </View>

        <Text style={[textStyle,{width:130,top:75,right:15,borderWidth:0,position:"absolute",fontSize:20,textAlign:"center"}]}>{"Merges with "+this.props.data.player.name}</Text>
        <Text style={[textStyle,{top:120,right:15,width:130,borderWidth:0,position:"absolute",fontSize:90,textAlign:"center"}]}>{69}</Text>

        <View style={{left:25}}>
          <Image style={imageStyle} source={pic}/>
        </View>

        <View style={[{justifyContent:"space-between",top:150, height:200}]} >
          <Button text="Offer Rematch" tint="bright" onclick={()=>{}}/>
          <Button text="+ Add Friend"  onclick={()=>{}}/>
          <Button text="Leave" tint="pale" onclick={()=>{this.props.nav("StartPage")}}/>
        </View>
      </View>
    )
  }
}
