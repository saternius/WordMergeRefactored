import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions} from 'react-native';

export default class Game{
  constructor(page){
    this.page = page;
    this.numWords=0;
    this.totGuestShift=0;
    this.totMyShift=0;
    this.pushN = 0;
    setTimeout(()=>{
      this.simulatedGame = new this.simulateGame(this);
    },100);

    this.gameType = "Any";
  }

  handleMatch(){
    this.makeCurBubbleGreen();
    this.page.refs["flasher"].flashSuccess();
    this.page.refs["myInput"].setState({hasWon:true});
    this.page.refs["man"].playRelief();
    setTimeout(()=>{
        this.page.props.nav("Results",{player:this.page.props.player,won:true, mode:this.gameType});
    },2400);
  }

  makeCurBubbleGreen(){
    setTimeout(()=>{
      var lastBubble = this.page.refs["bub_"+(this.numWords+1)];
      var gBubble = this.page.refs["gBub_"+(this.numWords+1)];
      lastBubble.setState({color:"#4fc257",shadowColor:"#06750b"});
      gBubble.setState({color:"#4fc257",shadowColor:"#06750b"});
    },300)
  }

  getLoserWord= (dir)=>{
    var loserWords = ["LOSER","YOU LOST","AWWW","SHUCKS",":(","NOOOO","(x_x)","GAH!","SO CLOSE!","D:","#(╯°□°）╯︵ ┻━┻#","DARN!","WHY!","SIGH..",">_<","HALP!","!!!","...","@#!$","QAQ","eAe","T_T",":[]",
    ":|","@_@","No.","I cant."];
    var details = {
      id:69,
      x:0,
      color: "rgb(180,0,0)",
      shadowColor: "rgb(60,0,0)",
      word:loserWords[Math.floor(Math.random()*loserWords.length)],
      y:160*dir
    }
    return details;
  }

  handleLoss = ()=>{

      setTimeout(()=>{
        this.page.refs["man"].gotoHangState(7);
        this.page.state.guestWords.push(this.getLoserWord(1));
        this.page.state.myWords.push(this.getLoserWord(-1));

        this.page.setState({
          guestWords:this.page.state.guestWords,
          myWords:this.page.state.myWords,
        });

        this.shiftBubbles(this.page.state.guestWords,false);
        this.shiftBubbles(this.page.state.myWords,true);


        setTimeout(()=>{
          this.page.props.nav("Results",{friend:this.page.props.player,won:false,mode:this.gameType});
        },800);

      },1500);
    }

  shiftBubbles = (myWords,p)=>{
      if(myWords.length<=1){
        return;
      }
      var margin = 5;
      var preTag = p?"bub_":"gBub_";
      var oTag = (!p)?"bub_":"gBub_";
      var lastBubble = this.page.refs[preTag+(myWords.length-1)];
      var gBubble = this.page.refs[oTag+(myWords.length-1)];

      var gShift = gBubble.getBubbleWidth()+margin;
      var xShift = lastBubble.getBubbleWidth()+margin;

      if(p){
        this.totMyShift+=(xShift+18);
      }else{
        this.totGuestShift+=(xShift+18);
      }

      for(var i=0; i<myWords.length-1;i++){
        var index = (i+1);
        var bubble = this.page.refs[preTag+index];
        var g_bubble = this.page.refs[oTag+index];
        var newX = Math.max(bubble.state.x+xShift,g_bubble.state.x+gShift);
        if(!bubble.shifted){
            this.animateBubbleShift(bubble, g_bubble, newX);
        }
        bubble.shifted = !bubble.shifted;
        g_bubble.shifted = !g_bubble.shifted;
      }
    }

    animateBubbleShift = (bubble, g_bubble, newX)=>{
      Animated.spring(
       bubble.state.xShift,
       {
         toValue: -newX,
         friction: 6,
       }
      ).start();

      Animated.spring(
       g_bubble.state.xShift,
       {
         toValue: -newX,
         friction: 6,
       }
      ).start();

      bubble.setState({x:newX});
      g_bubble.setState({x:newX});
    }


  pushWord = (p,w)=>{
    var wordArray = p?this.page.state.myWords:this.page.state.guestWords;
    var nW = this.numWords;
    var pN = this.pushN;
    var yDir = p?-1:1;
    var h = !p && !this.page.state.submittedWord;
    wordArray.push({
      id:(nW+1),
      word:w,
      x:0,
      y:(25*pN)*yDir-5,
      color: "rgb("+(222-pN*6)+","+(222-pN*38)+","+Math.max(0,130-pN*25)+")",
      shadowColor: "rgb("+(170-pN*6)+","+(170-pN*38)+","+Math.max(0,130-pN*25)+")",
      hide:h,
    })

    this.shiftBubbles(wordArray,p);
    this.updateState(p);
    if((p && this.wordRecieved)||(!p && this.page.state.submittedWord)){
      this.revealAndCheckMatch();
    }
  }

  revealAndCheckMatch = ()=>{
    var guestBubble = this.page.refs["gBub_"+(this.page.state.guestWords.length)];
    if(guestBubble!==undefined){
      guestBubble.setState({hide:false});
    }



    this.handleIfWordsMatch();
  }

  nextRound(){
    if(this.simulatedGame!=null){
      this.simulatedGame.nextRound();
    }
    this.page.setState({
      guestTyping:false,
      submittedWord:false,
    })
    this.wordRecieved = false;
    this.numWords++;
    this.pushN++;
  }


  handleMissMatch(){
    this.page.refs["flasher"].flashFailure();
    if(this.numWords<5){
      this.nextRound();
    }else{
      this.handleLoss();
    }
  }

  handleIfWordsMatch = ()=>{
      if(this.page.state.guestWords[this.numWords].word.toLowerCase().trim() === this.page.state.myWords[this.numWords].word.toLowerCase().trim()){
        this.handleMatch();
      }else{
        this.handleMissMatch();
      }
    }

  updateState = (p)=>{
    if(p){
        this.page.setState({
                submittedWord:true,
                myWords:this.page.state.myWords,
        });
      }else{
        this.page.setState({
          guestTyping:false,
          guestWords:this.page.state.guestWords,
        });
        this.wordRecieved = true;
      }
  }

  recieveWord(word){
    this.pushWord(false,word);
  }

  submitWord(word){
    this.page.refs["myInput"].clearInput();
    this.pushWord(true,word);
  }

  guestStartsTyping = ()=>{
    this.page.setState({guestTyping:true});
  }

  guestStopsTyping = ()=>{
    this.page.setState({guestTyping:false});
  }

  getTopWidth = ()=>{
    return Math.max(this.totGuestShift+180,this.totMyShift+180,Dimensions.get("window").width)
  }


  simulateGame = (function(ctx){
      var startTyping = ()=>{
        ctx.guestStartsTyping();
      }
      var stopTyping = ()=>{
        ctx.guestStopsTyping();
      }
      setTimeout(startTyping,200);
      setTimeout(stopTyping,350);
      setTimeout(startTyping,470);
      var lopezWords = ["blue","Microsoft","Azure","Lamborghini","Garage","books","knowledge","power","Hollywood","tedXTalks","47$","fuelUnit","mentors"];
      setTimeout(()=>{ctx.recieveWord(lopezWords[0])},2000);
      var i=0;
      this.nextRound = ()=>{
        setTimeout(startTyping,4000);
        setTimeout(()=>{ctx.recieveWord(lopezWords[i])},5500);
        i++;
      }
  });

}
