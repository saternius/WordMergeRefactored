import React, { Component, PropTypes } from 'react';
export default class ZenGame{
  constructor(page){
    this.page = page;
    this.numWords=0;
    this.totGuestShift=0;
    this.totMyShift=0;

    setTimeout(()=>{
      this.simulatedGame = new this.simulateGame();
    },100);
  }


  handleWin = ()=>{
    this.page.refs["flasher"].flashSuccess();
    this.page.refs["myInput"].setState({hasWon:true});
    this.page.refs["man"].playRelief();
    setTimeout(()=>{
        this.props.nav("Results",{friend:this.page.props.player,won:true});
    },2400);
  }

  getLoserWord= (dir)=>{
    var loserWords = ["LOSER","YOU LOST","AWWW","SHUCKS",":(","NOOOO","(x_x)","GAH!","SO CLOSE!","D:","#(╯°□°）╯︵ ┻━┻#","DARN!","WHY!","SIGH..",">_<","HALP!","!!!","...","@#!$","QAQ","eAe","T_T",":[]",
    ":|","@_@","No.","I cant."];
    var details = {
      id:69,
      x:0,
      color: "rgb(180,0,0)",
      shadowColor: "rgb(60,0,0)",
      hide: false,
      word:loserWords[Math.floor(Math.random()*loserWords.length)],
      y:160*dir
    }
    return details;
  }

  handleLoss = ()=>{

      setTimeout(()=>{
        this.page.refs["man"].gotoHangState(7);
        this.page.state.guestWords.push(getLoserWord(1));
        this.page.state.guestWords.push(getLoserWord(-1));

        this.setState({
          guestWords:this.page.state.guestWords,
          myWords:this.page.state.myWords,
        });
        shiftBubbles(this.page.state.guestWords,false);
        shiftBubbles(this.page.state.myWords,true);

        setTimeout(()=>{
          this.props.nav("Results",{friend:this.props.friend,won:false});
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
    var yDir = p?-1:1;
    var h = !p && !this.page.state.submittedWord;
    wordArray.push({
      id:(nW+1),
      word:w,
      x:0,
      y:(25*nW)*yDir-5,
      color: "rgb("+(222-nW*6)+","+(222-nW*38)+","+Math.max(0,130-nW*25)+")",
      shadowColor: "rgb("+(170-nW*6)+","+(170-nW*38)+","+Math.max(0,130-nW*25)+")",
      hide: h,
    })
    this.shiftBubbles(wordArray,p);
    this.updateState(p);
    if((p && this.wordRecieved)||(!p && this.page.state.submittedWord)){
      this.revealAndCheckMatch();
    }
  }

  revealAndCheckMatch = ()=>{
    var guestBubble = this.refs["gBub_"+(this.page.state.guestWords.length)];
    if(guestBubble!==undefined){
      guestBubble.setState({hide:false});
    }
    this.handleIfWordsMatch();
  }

  handleIfWordsMatch = ()=>{
      if(this.page.state.guestWords[this.numWords].word.toLowerCase() === this.page.state.myWords[this.numWords].word.toLowerCase()){
        this.handleWin();
      }else{
          this.page.refs["flasher"].flashFailure();
          this.page.refs["man"].gotoHangState(this.numWords+1);
          if(this.numWords<5){
            if(this.simulatedGame!=null){
              this.simulatedGame.nextRound();
            }
            this.page.setState({
              guestTyping:false,
              wordRecieved:false,
              submittedWord:false,
            })
            this.numWords++;
          }else{
            this.handleLoss();
          }
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
          wordRecieved:true,
          guestTyping:false,
          guestWords:this.page.state.guestWords,
        });
      }
  }

  recieveWord = (word)=>{
    this.pushWord(false,word);
  }

  guestStartsTyping = ()=>{
    this.page.setState({guestTyping:true});
  }

  guestStopsTyping = ()=>{
    this.page.setState({guestTyping:false});
  }

  getTopWidth = ()=>{
    return Math.max(this.totGuestShift+180,this.totMyShift+180,360)
  }


  simulateGame = (()=>{
      var startTyping = ()=>{
        this.guestStartsTyping();
      }
      var stopTyping = ()=>{
        this.guestStopsTyping();
      }
      setTimeout(startTyping,2000);
      setTimeout(stopTyping,3500);
      setTimeout(startTyping,4700);
      var lopezWords = ["blue","Microsoft","Azure","Lamborghini","Garage","books","knowledge","power","Hollywood","tedXTalks","47$","fuelUnit","mentors"];
      setTimeout(()=>{this.recieveWord(lopezWords[0])},6000);
      var i=0;
      this.nextRound = ()=>{
        setTimeout(startTyping,4000);
        setTimeout(()=>{this.recieveWord(lopezWords[i])},5500);
        i++;
      }
  });

}
