import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions} from 'react-native';
import Game from './Game';
var self;
export default class ClassicGame extends Game{
  constructor(page){
    super(page);
    self = this;
    this.gameType = "Classic";
  }

  recieveWord(word){
    super.recieveWord(word);
    if(!this.page.state.submittedWord){
      this.page.refs["girl"].appear();
    }
  }


  submitWord(word){
    if(!self.wordRecieved){
      self.page.refs["girl"].hide();
    }
    super.submitWord(word);
  }

  handleMissMatch(){
    this.page.refs["flasher"].flashFailure();
    this.nextRound();
  }

  handleMatch(){
    this.page.refs["flasher"].flashSuccess();
    //this.makeCurBubbleGreen();
    this.pushN=0;

  }

  nextRound(){
    super.nextRound();
    if(this.pushN>5){
      this.pushN=5;
    }
  }

}
