import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import MyInput from '../Components/MyInput';
import FormManager from '../Logic/FormManager';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    console.log("INSTANCE")
    this.FormManager = new FormManager([
      {ref:"username",validate:(FormManager.usernameValidate)},
      {ref:"password",validate:(FormManager.passwordValidate)},
    ]);
  }
  render() {
    var dims = Dimensions.get('window');
    return (
      <View>
          <WallPaper/>
          <NavigationBar hideBack/>
          <HoverPic pic={require('../images/welcome.png')} w={200} h={200} shakeMag={10}/>
          <View style={[{justifyContent: 'space-between', height:200, borderWidth:0,top:250}]}>
              <View style={{borderWidth:0, height:110, justifyContent: 'space-between'}}>
                <MyInput typing={function(){}} type="text" text="Username" placeholder="Username" ref="username" fin={()=>{return this.submit("username")}} focusFunc={()=>{return this.inputFocused("username")}} blurFunc={this.inputBlurFunc}/>
                <MyInput typing={function(){}} type="password" text="Password" placeholder="Password" ref="password" fin={()=>{return this.submit("password")}} focusFunc={()=>{return this.inputFocused("password")}} blurFunc={this.inputBlurFunc}/>
              </View>
              <View style={{top:0,left:0,width:360, borderWidth:0}}>
                    <Button text="Login" fullWidth={true} onclick={()=>{this.focusOnNextValid()}}/>
              </View>
          </View>
      </View>
    )
  }
}
