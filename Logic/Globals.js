export default class Globals{
  static _authToken;

  static setAuthToken(token){
    _authToken = token;
  }

  static getAuthToken(){
    return _authToken;
  }
}
