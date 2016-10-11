import React, { Component } from 'react';
import {TouchableWithoutFeedback, View, AppRegistry, TextInput, Text, StyleSheet } from 'react-native';
import MyComponent from './MyComponent'
import p from '../Logic/P.js';
export default class MyInput extends MyComponent {

  constructor(props) {
    super(props);
    this.setDefaultState({
      text:"text",
      placeholder: "Placeholder",
      warn:false,
    });

    this.clear = ()=>{
      this.setState({removeDiv:true,text:"", warn:false});
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

    this.warn = ()=>{
      this.setState({warn:true, removeDiv:false});
    }
  }

  render() {

    var styles = StyleSheet.create({
      defaultInputFocus:{
        color:"black",
      },
      clearDivActive:{
        width:p.w(240),
        height:p.h(48),
        backgroundColor:"red",
        position:"absolute",
        zIndex:2,
        opacity:.01
      },
      clearDivHidden:{
        width:p.w(240),
        height:p.h(48),
        backgroundColor:"red",
        position:"absolute",
        zIndex:-1,
        opacity:.01
      },
      defaultInputView:{
		    borderRadius: p.w(10),
    		paddingTop:0,
    		paddingBottom:0,
    		backgroundColor: "#e3e3e3",
    		marginHorizontal: p.w(20),
    	  borderColor: 'black',
    		borderWidth: 1,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: {width: p.w(5), height: p.h(5)},
        shadowRadius: p.w(10),
        shadowOpacity: 1.0,
        alignItems:"center",
        width:p.w(270),
    	},
    	defaultInput:{
    		fontSize:p.w(20),
    		fontWeight:'bold',
    		fontFamily: "Trebuchet",
    		textAlign: 'center',
    		width:p.w(240),
    		paddingTop:p.h(5),
    		paddingBottom:p.h(5),
    		color:"#b3b3b3",
        borderWidth:0,
    	},
      warnView:{
        backgroundColor:"#f2bbbb",
      },
      warnText:{
        color:"red",
      }
    });

    var clearDivStyle = styles.clearDivActive;
    var textStyle;

    if(this.state.removeDiv){
      clearDivStyle = styles.clearDivHidden;
      textStyle = styles.defaultInputFocus;
    }
    var isPass = (this.props.type==="password" && this.state.text!==this.state.placeholder);

    var textView = [styles.defaultInputView,{padding:0,height:p.h(50)}];
    if(this.props.type==="gameInput"){
      if(this.props.classic){
        textView.push({width:p.w(275),left:p.w(-35)});
      }else{
        textView.push({width:p.w(325)});
      }
    }

    var underlineColor = "#e3e3e3";

    if(this.state.warn){
      textStyle = styles.warnText;
    }

    return (
      <View style={{borderWidth:0, justifyContent:"center",flexDirection:"row"}}>
        <TouchableWithoutFeedback onPressIn={this.clearAndFocus}>
          <View style={clearDivStyle}></View>
        </TouchableWithoutFeedback>
        <View style={textView}>
          <TextInput
            style={[styles.defaultInput,textStyle,{fontWeight:"normal", top:0,fontSize:p.w(24),fontFamily:"baloo"}]}
            onChangeText={(t) => { this.setState({text:t})} }
            value={this.state.text}
            underlineColorAndroid={underlineColor}
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
