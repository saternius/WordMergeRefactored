import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, ToastAndroid } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import MyInput from '../Components/MyInput';
import FormManager from '../Logic/FormManager';
import Network from '../Logic/Network';
import p from '../Logic/P.js';

export default class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.formManager = new FormManager(this,[
      {type:"text",placeholder:"Email", ref:"email"},
      {type:"text",placeholder:"Username", ref:"username"},
      {type:"password",placeholder:"Password", ref:"password"},
      {type:"password",placeholder:"Confirm Pass", ref:"confirm"},
    ],(inputVals)=>{
      Network.signUp(...inputVals).then(
        (res)=>{
          console.log(res);
          this.props.nav("Home");
        }
    ).catch(
      (rej)=>{
        if(typeof rej === 'object'){
          rej = rej.message;
        }
        ToastAndroid.show(rej, 1500);
        if(rej === "Passwords do not match"){
          this.formManager.setWarn(["password","confirm"]);
        }
      });
    });
  }
  render() {
    var inputs = this.formManager.getInputs();
    return (
      <View>
          <WallPaper/>
          <NavigationBar nav={this.props.nav} back={this.props.back}/>
          <HoverPic pic={require('../images/welcome.png')} w={p.w(200)} h={p.w(200)} shakeMag={p.w(10)}/>
          <View style={[{justifyContent: 'space-between', height:p.h(285), borderWidth:0,top:p.h(250)}]}>
              <View style={{borderWidth:0, height:p.h(210), justifyContent: 'space-between'}}>
                {inputs}
              </View>
              <View style={{top:0,left:0,width:p.w(360), borderWidth:0}}>
                    <Button text="Login" fullWidth={true} onclick={this.formManager.focusOnNextValid.bind(this.formManager)}/>
              </View>
          </View>
      </View>
    )
  }
}
