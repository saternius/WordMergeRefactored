import React, { Component, PropTypes } from 'react';
import MyInput from '../Components/MyInput';
export default class FormManager{
  constructor(parent,inputDefs,cb){
    this.inputs = [];
    this.refs = {};
    this.par = parent;
    this.cb = cb;

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


  isValid(input,type){
    //TODO: Make a proper validation method.
    return true;
  }

  submit(id){
    var el = this.par.refs[id];
    if(this.isValid(el.getText(), null)){
        this.focusOnNextValid();
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

  focusOnNextValid(){
    for(var i in this.refs){
        if(this.par.refs[i].isEmpty()){
          this.par.refs[i].clearAndFocus();
          return;
        }
    }
    this.cb(this.getInputVals());
  }

  setWarn(refs){
    for(var i=0;i<refs.length; i++){
      this.par.refs[refs[i]].warn();
    }
  }

}
