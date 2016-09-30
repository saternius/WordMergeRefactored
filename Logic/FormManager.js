import React, { Component, PropTypes } from 'react';
import MyInput from '../Components/MyInput';
export default class FormManager{
  constructor(parent,inputDefs,cb){
    this.inputs = [];
    this.refs = {};
    this.par = parent;
    this.isValid = (input,type)=>{
      return true;
    }

    this.submit = (id)=>{
      var el = parent.refs[id];
      if(this.isValid(el.getText(), null)){
          this.focusOnNextValid();
      }
    }

    this.focusOnNextValid = ()=>{
      for(var i in this.refs){
          if(parent.refs[i].isEmpty()){
            parent.refs[i].clearAndFocus();
            return;
          }
      }
      cb();
    }

    for(var i=0; i<inputDefs.length;i++){
      var typingFunc = inputDefs[i].typing!==undefined?inputDefs[i].typing:(()=>{});
      var type = inputDefs[i].type!==undefined?inputDefs[i].type:"text";
      var placeholder = inputDefs[i].placeholder!==undefined?inputDefs[i].placeholder:"";
      var ref = inputDefs[i].ref!==undefined?inputDefs[i].ref:"dyn_"+i;
      var fin = inputDefs[i].fin!==undefined?inputDefs[i].fin:(()=>{return this.submit(ref)});
      var focus = inputDefs[i].focus!==undefined?inputDefs[i].focus:(()=>{});
      var blur = inputDefs[i].blur!==undefined?inputDefs[i].blur:(()=>{});

      var input = <MyInput typing={typingFunc} key={"dynInp_"+i} type={type} text={placeholder} placeholder={placeholder} ref={ref} fin={fin} focusFunc={focus} blurFunc={blur}/>;
      this.refs[ref]= inputDefs[i];
      this.inputs.push(input);
    }
  }

  getInputs = ()=>{
    return (this.inputs);
  }

  getInputVals(){
    var ret = [];
    for(var ref in this.refs){
      ret.push(this.par.refs[ref].state.text);
    }
    return ret;
  }
}
