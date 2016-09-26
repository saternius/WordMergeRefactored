import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
// import Button from '../Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
export default class HomePage extends Component {
  render() {
    return (
      <View>
      <WallPaper/>
      <NavigationBar/>
      <HoverPic pic={require('../images/iconBase.png')}/>
      </View>
    )
  }
}
