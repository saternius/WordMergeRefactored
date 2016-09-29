import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions} from 'react-native';
import Game from './Game';
export default class ZenGame extends Game{
  constructor(page){
    super(page);
    this.gameType = "Zen";
  }

  handleMissMatch(){
    super.handleMissMatch();
    this.page.refs["man"].gotoHangState(this.numWords+1);
  }
}
