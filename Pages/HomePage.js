import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import p from '../Logic/P.js';

export default class HomePage extends Component {
  render() {
    var dims = Dimensions.get('window');
    console.log(dims.width+":"+dims.height);
    return (
      <View>
      <WallPaper/>
      <NavigationBar hideBack/>
      <HoverPic pic={require('../images/iconTop.png')} w={p.w(250)} h={p.h(100)} shakeMag={p.w(5)}/>
      <HoverPic pic={require('../images/iconBase.png')}  w={p.w(220)} h={p.h(250)}/>
        <View style={[{position:"absolute",borderWidth:0,width:dims.width,height:p.h(200),top:p.h(355),zIndex:22,justifyContent: 'space-between',}]}>
          <Button text="Login" onclick={()=>{return this.props.nav("Login")}}/>
          <Button text="Sign Up" tint="pale" onclick={()=>{return this.props.nav("SignUp")}}/>
          <Button text="Connect" tint="facebook" onclick={()=>{return this.props.nav("Start")}}/>
        </View>
      </View>
    )
  }
}
