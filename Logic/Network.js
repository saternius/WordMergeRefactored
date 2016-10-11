var host = "http://172.16.179.50:8000/";
export default class FormManager{

  static genRoom(authToken,gameMode){
    return new Promise(function(res,rej){
      post("room/create",{
        auth_token:auth_token,
        game_mode:gameMode
      },res,rej);
    });
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
    return new Promise(function (res,rej){
      if(!email || !username || !password || !confirm) {
        rej('Insufficient login information');
        return;
      }
      if(password!==confirm){
        rej('Passwords do not match');
      }

      post("auth/signup",{
        email:email,
        username:username,
        password:password,
        image_url:"../images/woot.png"
      },res,rej);

    })
  }

  static logIn(username,password){
    return new Promise((res,rej)=>{
      post("auth/login",{
        username:username,
        password:password
      },res,rej);
    })
  }
}


function post(endpoint, body, cb, rej) {
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
      rej(err)
    }
  }) //calls the callback with the response json
	.catch((err) => {rej(err)})
}
