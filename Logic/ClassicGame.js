import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions} from 'react-native';
import Game from './Game';
export default class ClassicGame extends Game{
  constructor(page){
    super(page);
    self = this;
    this.gameType = "Classic";
    this.numMatched = 0;
  }

  recieveWord(word){
    super.recieveWord(word);
    if(!this.page.state.submittedWord){
      this.page.refs["girl"].appear();
    }
  }


  submitWord(word){
    if(!this.wordRecieved){
      this.page.refs["girl"].hide();
    }
    super.submitWord(word);
  }

  handleMissMatch(){
    this.page.refs["flasher"].flashFailure();
    this.nextRound();
  }

  handleMatch(){
    this.page.refs["flasher"].flashSuccess();
    this.makeCurBubbleGreen();
    setTimeout(()=>{
      this.pushN=-1;
      this.nextRound();
    },600);
    this.numMatched++;
  }

  nextRound(){
    super.nextRound();
    if(this.pushN>5){
      this.pushN=5;
    }
  }

  outOfTime(){
    this.page.props.nav("Results",{player:this.page.props.player, mode:this.gameType, matched:this.numMatched});
  }

}
