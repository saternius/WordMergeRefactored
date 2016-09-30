import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
// import AnimatedIcon from '../AnimatedIcon';
import Button from '../Components/Button';
import WallPaper from '../Components/WallPaper';
import HoverPic from '../Components/HoverPic';
import MyInput from '../Components/MyInput';
import FormManager from '../Logic/FormManager';
import Network from '../Logic/Network';

export default class SignUpPage extends Component {
  constructor(props){
    super(props);
    this.formManager = new FormManager(this,[
      {type:"text",placeholder:"Email"},
      {type:"text",placeholder:"Username"},
      {type:"password",placeholder:"Password"},
      {type:"password",placeholder:"Confirm Pass"},
    ],()=>{
      Network.signUp(...this.formManager.getInputVals());
    });
  }
  render() {
    var inputs = this.formManager.getInputs();
    return (
      <View>
          <WallPaper/>
          <NavigationBar nav={this.props.nav} back={this.props.back}/>
          <HoverPic pic={require('../images/welcome.png')} w={200} h={200} shakeMag={10}/>
          <View style={[{justifyContent: 'space-between', height:285, borderWidth:0,top:250}]}>
              <View style={{borderWidth:0, height:210, justifyContent: 'space-between'}}>
                {inputs}
              </View>
              <View style={{top:0,left:0,width:360, borderWidth:0}}>
                    <Button text="Login" fullWidth={true} onclick={()=>{this.formManager.submitIfFilled}}/>
              </View>
          </View>
      </View>
    )
  }
}
