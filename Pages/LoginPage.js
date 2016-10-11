import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions, AsyncStorage, ToastAndroid } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import MyInput from '../Components/MyInput';
import FormManager from '../Logic/FormManager';
import Network from '../Logic/Network';
import p from '../Logic/P';
import Globals from '../Logic/Globals';

export default class LoginPage extends Component {
  constructor(props){
    super(props);
    this.formManager = new FormManager(this,[
      {type:"text",placeholder:"Username"},
      {type:"password",placeholder:"Password"},
    ],(inputVals)=>{
      Network.logIn(...inputVals).then((res)=>{
        console.log("authToken: "+res.auth_token);
        Globals.setAuthToken(res.auth_token);
        this.props.nav("Start");
      }).catch((rej)=>{
        console.log("rej..");
        console.log(rej);
        ToastAndroid.show(rej.message,1500);
      });
    });

    this.submitIfFilled = ()=>{
      this.formManager.submitIfFilled();
    }
  }
  render() {
    var inputs = this.formManager.getInputs();
    return (
      <View>
          <WallPaper/>
          <NavigationBar nav={this.props.nav} back={this.props.back}/>
          <HoverPic pic={require('../images/welcome.png')} w={p.w(200)} h={p.w(200)} shakeMag={p.w(10)}/>
          <View style={[{justifyContent: 'space-between', height:p.h(200), borderWidth:0,top:p.h(250)}]}>
              <View style={{borderWidth:0, height:p.h(110), justifyContent: 'space-between'}}>
                {inputs}
              </View>
              <View style={{top:0,left:0,width:p.w(360), borderWidth:0}}>
                    <Button text="Login" fullWidth={true} onclick={()=>{this.submitIfFilled()}}/>
              </View>
          </View>
      </View>
    )
  }
}
