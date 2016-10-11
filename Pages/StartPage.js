import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import Prompt from '../Components/Prompt';

export default class StartPage extends Component {
  promptLogOut(){
    this.refs["prompt"].setState({visible:true});
  }
  render() {
    var dims = Dimensions.get('window');
    return (
      <View>
      <WallPaper/>
      <NavigationBar nav={this.props.nav} back={this.promptLogOut.bind(this)}/>
      <HoverPic pic={require('../images/iconTop.png')} w={250} h={100} shakeMag={5}/>
      <HoverPic pic={require('../images/iconBase.png')}  w={220} h={250}/>
      <Prompt ref="prompt" message="Are you sure you want to LOG OUT?" accept={()=>{this.props.nav("LogOut")}}/>
        <View style={[{position:"absolute",borderWidth:0,width:dims.width,height:260,top:335,zIndex:22,justifyContent: 'space-between',}]}>
          <Button text="Classic" tint="yellow" onclick={()=>{return this.props.nav("Settings",{mode:"Classic"})}}/>
          <Button text="Zen" tint="blue" onclick={()=>{return this.props.nav("Settings",{mode:"Zen"})}}/>
          <Button text="Any Game" tint="bright" onclick={()=>{return this.props.nav("Wait",{mode:"any"})}}/>
          <Button text="Join Room" onclick={()=>{return this.props.nav("Join");}}/>
        </View>
      </View>
    )
  }
}
