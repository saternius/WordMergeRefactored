import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity,Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var nav;
import p from '../Logic/P.js';
export default class GuestBar extends Component {
  constructor(props){
    super(props);
  }
  render() {
      var styles = this.styles;
      var colours = ["#2f4f4d","#21403a"];
      var guestTextStyle = [styles.guestText];
      if(this.props.profileDetails.name.length>14){
        guestTextStyle.push(styles.smallerGuestText);
      }

      return(
          <LinearGradient colors={colours} >
            <View style={styles.guestBarView}>
              <View>
                <Image style={[styles.guestBarImage,{borderRadius:p.w(10)}]} source={this.props.profileDetails.pic}/>

              </View>
              <View>
                <Text style={guestTextStyle}>{this.props.profileDetails.name+" ("+this.props.profileDetails.wins+")"}</Text>
              </View>
            </View>
            <View style={[styles.guestBarShadow,{backgroundColor:"#11302a"}]}></View>

          </LinearGradient>
        )
      }

      styles = StyleSheet.create({
        guestText:{
          fontSize:p.w(35),
          fontFamily:"Trebuchet",
          fontWeight:"bold",
          textShadowColor:"#171f1f",
          textShadowOffset:{width:p.w(1),height:p.h(1)},
          textShadowRadius:p.w(10),
          color:"#cfcfcf",
          top:p.h(10),
        },
        smallerGuestText:{
          fontSize:p.w(25),
          top:p.h(18)
        },
        guestBarView:{
          width:Dimensions.get('window').width,
          height:p.h(65),
          flexDirection:"row",
          justifyContent:"center",
        },
        guestBarShadow:{
          width:Dimensions.get('window').width,
          height:p.h(6),
          backgroundColor: "#13453e",
        },
        guestBarImage:{
          width:p.w(55),
          height:p.h(55),
          top:p.h(7),
          marginRight:p.w(20),
        },
      });
}
