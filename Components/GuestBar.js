import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity,Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var nav;
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
                <Image style={[styles.guestBarImage,{borderRadius:10}]} source={this.props.profileDetails.pic}/>

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
          fontSize:35,
          fontFamily:"Trebuchet",
          fontWeight:"bold",
          textShadowColor:"#171f1f",
          textShadowOffset:{width:1,height:1},
          textShadowRadius:10,
          color:"#cfcfcf",
          top:10,
        },
        smallerGuestText:{
          fontSize:25,
          top:18
        },
        guestBarView:{
          width:Dimensions.get('window').width,
          height:65,
          flexDirection:"row",
          justifyContent:"center",
        },
        guestBarShadow:{
          width:Dimensions.get('window').width,
          height:6,
          backgroundColor: "#13453e",
        },
        guestBarImage:{
          width:55,
          height:55,
          top:7,
          marginRight:20,
        },
      });
}
