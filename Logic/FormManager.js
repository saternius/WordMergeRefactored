
export default class FormManager{
  constructor(inputDef){
    console.log("I AM")
    //Nothing for now
    for(var i=0;i<inputDef.length;i++){
      console.log(inputDef[i].validate());
    }
  }

  static usernameValidate = ()=>{
    return true;
  }
  static passwordValidate = ()=>{
    return true;
  }
}
