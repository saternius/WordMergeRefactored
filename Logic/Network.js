var host = "http://172.16.179.50:6969/";
export default class FormManager{
  static genRoom(mode){
    return "TAILPZ";
  }

  static waitForPlayer(cb){
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

  static signUp(email,username,password,confirm){
    if(!email || !username || !password || !confirm) {
      throw new Error('Insufficient login information');
      return;
    }
    // if(password!==confirm){
    //   throw new Error('Passwords do not match');
    // }

    post("auth/signup",{
      email:email,
      username:username,
      password:password,
      image_url:"../images/woot.png"
    },()=>{

    })
  }
}


function post(endpoint, body, cb) {
	if(typeof body === 'object'){
		body = JSON.stringify(body)
  }

	fetch(host+endpoint, {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: body
	})
	.then((resStr) => resStr.json()) //gets the json response
	.then(res => {
    if(res.status==200){
      cb(res)
    }else{
      console.log(err); throw new Error(err)
    }
  }) //calls the callback with the response json
	.catch((err) => {console.log(err); throw new Error(err)})
}
