import React, { Component } from 'react';
import {TouchableWithoutFeedback, View, AppRegistry, TextInput, Text, StyleSheet } from 'react-native';
import MyComponent from './MyComponent'
export default class MyInput extends MyComponent {

  constructor(props) {
    super(props);
    this.setDefaultState({
      text:"text",
      placeholder: "Placeholder",
    });

    this.clear = ()=>{
      this.setState({removeDiv:true,text:""})
    }

    this.clearAndFocus = ()=>{
      this.clear();
      this.refs.nameInput.focus();
    }

    this.clearAndBlur = ()=>{
      this.clear();
      this.refs.nameInput.blur();
    }

    this.checkEmpty = ()=>{
      if(this.state.text === ""){
        this.setState({removeDiv:false,text:this.state.placeholder})
      }
      this.props.blurFunc();
    }

    this.isEmpty = ()=>{
      return this.state.text === this.state.placeholder;
    }

    this.getText = ()=>{
      return this.state.text;
    }
  }

  render() {

    var styles = StyleSheet.create({
      defaultInputFocus:{
        color:"black",
      },
      clearDivActive:{
        width:240,
        height:48,
        backgroundColor:"red",
        position:"absolute",
        zIndex:2,
        opacity:.01
      },
      clearDivHidden:{
        width:240,
        height:48,
        backgroundColor:"red",
        position:"absolute",
        zIndex:-1,
        opacity:.01
      },
      defaultInputView:{
		    borderRadius: 10,
    		paddingTop:0,
    		paddingBottom:0,
    		backgroundColor: "#e3e3e3",
    		marginHorizontal: 20,
    	  borderColor: 'black',
    		borderWidth: 1,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowRadius: 10,
        shadowOpacity: 1.0,
        alignItems:"center",
        width:270,
    	},
    	defaultInput:{
    		fontSize:20,
    		fontWeight:'bold',
    		fontFamily: "Trebuchet",
    		textAlign: 'center',
    		width:240,
    		paddingTop:5,
    		paddingBottom:5,
    		color:"#b3b3b3",
        borderWidth:0,
    	}
    });

    var clearDivStyle = styles.clearDivActive;
    var textStyle;

    if(this.state.removeDiv){
      clearDivStyle = styles.clearDivHidden;
      textStyle = styles.defaultInputFocus;
    }
    var isPass = (this.props.type==="password" && this.state.text!==this.state.placeholder);

    var textView = [styles.defaultInputView,{padding:0,height:50}];
    if(this.props.type==="gameInput"){
      textView.push(styles.gameInputView);
      if(this.props.classic){
        textView.push({width:275});
      }
      textStyle=styles.gameInputText;
        if(this.state.removeDiv){
          textStyle = styles.gameTextInputFocus;
        }
    }

    return (
      <View style={{borderWidth:0, justifyContent:"center",flexDirection:"row"}}>
        <TouchableWithoutFeedback onPressIn={this.clearAndFocus}>
          <View style={clearDivStyle}></View>
        </TouchableWithoutFeedback>
        <View style={textView}>
          <TextInput
            style={[styles.defaultInput,textStyle,{fontWeight:"normal", top:0,fontSize:24,fontFamily:"baloo"}]}
            onChangeText={(t) => { this.setState({text:t})} }
            value={this.state.text}
            underlineColorAndroid="#e3e3e3"
            onBlur={this.checkEmpty}
            onFocus={this.props.focusFunc}
            ref="nameInput"
            onSubmitEditing={()=>{this.props.fin(this.state.text)}}
            type={this.props.type}
            secureTextEntry={isPass}
          />
        </View>
      </View>
    );
  }
}
