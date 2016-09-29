import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight,Navigator, Image, TouchableOpacity, Animated, ScrollView, Dimensions, StyleSheet } from 'react-native';

 import WordBubble from '../Components/WordBubble';
import Hangman from '../Components/Hangman';
import Flasher from '../Components/Flasher';
import ZenGame from '../Logic/ZenGame';
import GuestBar from '../Components/GuestBar';
import InputBar from '../Components/InputBar';

export default class ZenPage extends Component {

  constructor(props){
    super(props);
    this.state={
      guestTyping:false,
      submittedWord:false,
      myWords:[],
      guestWords:[],
    }
    this.Game = new ZenGame(this);
  }

  render() {
    var styles = this.styles;
    var guestActionStyle = [styles.guestTypeContainer];
    var guestActionTextStyle = [styles.guestTypeText];
    var guestFullContainerStyle = [styles.fullGuestBubbleContainer,{position:"relative",width:360,height:232,top:0,right:0,zIndex:10}];
    var myFullContainerStyle = [styles.fullBubbleContainer,{position:"absolute",width:360,height:232,top:232,right:0,zIndex:10}];

    var guestText = this.props.player.name + " is typing...";
    if(this.state.guestTyping){
      guestFullContainerStyle.push({top:20});
    }else{
      guestActionTextStyle.push(styles.hiddenGameText);
      guestText = "";
      guestFullContainerStyle.push({top:0});
    }
    var topWidth = this.Game.getTopWidth();
    guestFullContainerStyle.push({width:topWidth});
    myFullContainerStyle.push({width:topWidth});
    var dims = Dimensions.get('window');

    return (
    <View style={{width:dims.width,height:dims.height}}>
        <Flasher ref="flasher"/>
        <GuestBar profileDetails={this.props.player}/>
        <View style={guestActionStyle}>
          <Text style={guestActionTextStyle}>
            {guestText}
          </Text>
        </View>
        <Hangman ref="man"/>
        <InputBar ref="myInput" classic={false} onSubmit={this.Game.submitWord} hideInput={this.Game.submittedWord} guest={this.props.player.name}/>
        <ScrollView ref="bubbleScroller" horizontal={true} style={[styles.gameBody,{position:"absolute",width:360,height:640,padding:0}]} contentContainerStyle={{}}
        onContentSizeChange={(contentWidth, contentHeight)=>{
          this.refs["bubbleScroller"].scrollTo({x:contentWidth});
        }}>
           <View style={guestFullContainerStyle}>
              {
                this.state.guestWords.map((word) => (
                  <WordBubble ref={"gBub_"+word.id} spike={true} key={"gBubble_"+word.id} word={word.word} num={this.state.numWords} x={word.x} y={word.y} color={word.color} shadowColor={word.shadowColor} id={word.id} guest={true} hide={word.hide}/>
                ))
              }
           </View>
        </ScrollView>
    </View>
    //
    //

    //
    //        <View style={myFullContainerStyle}>
    //         {
    //           this.state.myWords.map((word) => (
    //             <WordBubble ref={"bub_"+word.id} spike={true} key={"bubble_"+word.id} word={word.word} num={this.state.numWords} x={word.x} y={word.y} color={word.color} shadowColor={word.shadowColor} id={word.id} guest={false}/>
    //           ))
    //         }
    //       </View>
    //


    )
  }

  styles = StyleSheet.create({
    guestTypeContainer:{
      position:"absolute",
      top:70,
      left:0,
      zIndex:999,
      width:360,
      backgroundColor:"#c2eded",
    },
    guestTypeText:{
      fontSize:20,
      fontFamily:"Trebuchet",
      fontWeight:"bold",
      color:"#75999c",
    },
    hiddenGameText:{
      color:"#c9f5f5"
    },
    fullGuestBubbleContainer:{
      position:"absolute",
      zIndex:1,
      top:100,
      left:0,
      width:360,
      height:235,
      flexDirection:"row",
    },
  });
}
