import React, { Component, PropTypes } from 'react';
import { View, Text,TouchableWithoutFeedback, TouchableHighlight,Navigator, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import p from '../Logic/P.js';

//There are just some classes that are not worth refactoring.
export default class Button extends Component {
	constructor(props) {
		super(props);
  	this.state = {pressed: false};

		this.pressed = ()=>{
  		this.props.onclick();
  		this.setState({pressed:true});
  	}

  	this.released = ()=>{
			if(!this.props.willKillMe){
    		setTimeout(()=>{
    			this.setState({pressed:false});
    		},500);
			}
  	}
	}

  render() {
 	var tint;
 	var tintBottom;
 	var sideImage;
	var extraBottomStyle = {flexDirection: 'row',justifyContent: 'space-between'};
	var pressedConfirmStyle = {top:p.h(5),opacity:.5};
 	var btnTextStyle = [{fontSize:p.h(27),top:p.h(3),fontFamily: "baloo",color:"#FDF5D3",textAlign: 'center',width:p.w(200)}];
	var colours = ["#007556","#00523d"];
	var height = p.h(5);
	var bW = p.w(1);
	var extraBS;
	var moreBS;
  	switch(this.props.tint){
  		default:
				tint = {backgroundColor: "#007556"};
				tintBottom = {backgroundColor: "#02402e"};
				colours = ["#007556","#00523d"];
  			break;
  		case "pale":
				tint = {backgroundColor: "#437a53"};
				tintBottom = {backgroundColor: "#324f38"};
				colours = ["#437a53","#3f6645"];
  			break;
			case "bright":
				tint = {backgroundColor: "#498f36"};
				tintBottom = {backgroundColor: "#2f5c18"};
				colours = ["#498f36","#467a1f"];
				break;
			case "yellow":
				tint = {backgroundColor: "#ffff75"};
				tintBottom = {backgroundColor: "#5c5c00"};
				colours = ["#cfcf5d","#8a8a12"];
			break;
			case "blue":
				tint = {backgroundColor: "#408fc7"};
				tintBottom = {backgroundColor: "#104c78"};
				colours = ["#408fc7","#156799"];
			break;
  		case "facebook":
				tint = {backgroundColor: "#005a7a"};
				tintBottom = {backgroundColor: "#043661"};
				colours = ["#005a7a","#004269"];
  			sideImage = <Image style={{width:p.w(30),height:p.h(30),position:"absolute",top:p.h(14),left:p.w(25),}} source={require('../images/fbIcon.png')}/>;
  			btnTextStyle.push({left:p.w(22)});
  			break;
			case "chal":
				tint = {backgroundColor: "#660200",width:p.w(180),height:p.h(42),left:p.h(95),top:p.h(9)};
				tintBottom = {backgroundColor: "#360000",width:p.w(50),height:p.h(42),left:p.w(95),top:p.h(13),paddingLeft:0,paddingRight:0};
				extraBottomStyle = {left:0,width:p.w(200),paddingTop:p.h(8), height:p.h(40)};
				height=5;
				btnTextStyle.push({top:p.h(-3),fontSize:p.h(21)});
				pressedConfirmStyle = {top:p.h(4),opacity:.5};
				bW=0;
				extraBS={left:p.w(95),top:p.h(10),width:p.w(200),height:p.h(45)},
				moreBS={top:p.h(5)}
				tint = {backgroundColor: "#660200"};
				tintBottom = {backgroundColor: "#240201"};
				colours = ["#660200","#360000"];
				break;
  	}
  	var pressedStyle;
		var bColor = "#02474f"

  	if(this.state.pressed){
  		pressedStyle = pressedConfirmStyle;
			bColor = "transparent";
			height = 0;
			tintBottom = {backgroundColor: "transparent"};
  	}

		var myWidth = this.props.fullWidth?p.w(270):p.w(200);
		if(this.props.fullWidth){
			extraBottomStyle = {};
		}
		var btnStyle = {paddingLeft:p.w(1),paddingRight:p.h(1),paddingTop:p.h(5),paddingBottom:p.h(5),borderRadius: p.w(5)};

		if(this.props.w!==undefined){
			myWidth = this.props.w;
		}

		var t = this.props.t!==undefined?this.props.t:0;
		var l = this.props.l!==undefined?this.props.l:0;

    return (
			<View style={{top:t,left:l,borderWidth:0,flexDirection:"row",justifyContent:"center"}}>
	    	<View style={[{width:myWidth,borderRadius:p.w(5),height:p.h(63), borderWidth:bW, borderColor:bColor, marginTop:0},extraBS]} elevation={height}>
	    	<View style={[btnStyle, tintBottom,{position:"absolute",top:p.h(4),borderRadius:p.w(5), width:myWidth}, extraBottomStyle, moreBS]}>
	    		<Text style={btnTextStyle}>{" "}</Text>
	    	</View>
	    	<TouchableWithoutFeedback onPressIn={this.pressed} onPressOut={this.released}>
		   			<LinearGradient colors={colours} style={[btnStyle, tint, pressedStyle,{flexDirection:"row",justifyContent:"center"},extraBottomStyle]}>
			    		{sideImage}
			    		<Text style={btnTextStyle}>{this.props.text}</Text>
		    		</LinearGradient >
	    	</TouchableWithoutFeedback>
	    	</View>
			</View>
      )
  }
}
