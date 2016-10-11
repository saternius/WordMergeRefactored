import {Dimensions} from 'react-native';
var window_dims = Dimensions.get('window');
export default class P{
  static w(x){
    return window_dims.width*(x/360);
  }

  static h(y){
    return window_dims.height*(y/640);
  }
}
