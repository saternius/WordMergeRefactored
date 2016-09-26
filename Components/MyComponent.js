import React, { Component } from 'react';
export default class MyComponent extends Component {

  //If the prop is declared, make it the current state, otherwise use the provided defaults.
  //Note: unless specified with a default, a prop val is not automatically added to the states.
  setDefaultState(defaults) {
    var defState = {};
    for(val in defaults){
      defState[val] = this.props[val]!==undefined?this.props[val]:defaults[val];
    }
    this.state = defState;
  }
}
