import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
export default class HomePage extends Component {
  render() {
    var dims = Dimensions.get('window');
    console.log(this.props);
    return (
      <View>
      <WallPaper/>
      <NavigationBar hideBack/>
      <HoverPic pic={require('../images/iconTop.png')} w={250} h={100} shakeMag={5}/>
      <HoverPic pic={require('../images/iconBase.png')}  w={220} h={250}/>
        <View style={[{position:"absolute",borderWidth:0,width:dims.width,height:200,top:355,zIndex:22,justifyContent: 'space-between',}]}>
          <Button text="Login" onclick={()=>{return this.props.nav("Login")}}/>
          <Button text="Sign Up" tint="pale" onclick={()=>{return this.props.nav("SignUp")}}/>
          <Button text="Connect" tint="facebook" onclick={()=>{return this.props.nav("ConnectFB")}}/>
        </View>
      </View>
    )
  }
}
