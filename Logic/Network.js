
export default class FormManager{
  static genRoom = (mode)=>{
    return "TAILPZ";
  }

  static waitForPlayer = (cb)=>{
    setTimeout(()=>{
      cb({
        status:200,
        player:{
          id: 1,
          name: 'Tai Lopez',
          wins: '27',
          pic: require('../images/tai.png')
        }
      })
    },2000);
  }
}
