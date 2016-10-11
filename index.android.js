/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
} from 'react-native';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import StartPage from './Pages/StartPage';
import JoinPage from './Pages/JoinPage';
import WaitPage from './Pages/WaitPage';
import SettingsPage from './Pages/SettingsPage';
import MakePage from './Pages/MakePage';
import ZenPage from './Pages/ZenPage';
import ClassicPage from './Pages/ClassicPage';
import ResultsPage from './Pages/ResultsPage';

class WordMerge extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
       <Navigator
          initialRoute={{
            page: "Home",
            data:{player:{ id: 1, name: 'Tai Lopez', wins: '27', pic:require('./images/tai.png') }}
          }}
          renderScene={(route, navigator) => {

            navigate = function(p,d){
              if(p === "LogOut"){
                navigator.popToTop();
              }else{
                navigator.push({
                    page: p,
                    data:d
                  });
              }
            };

            back = function(){
                navigator.pop();
            };

            switch(route.page){
              case "Home":
                  return (<HomePage nav={navigate}/>);
              case "Login":
                  return (<LoginPage nav={navigate} back={back}/>);
              case "SignUp":
                  return (<SignUpPage nav={navigate} back={back}/>);
              case "Start":
                  return (<StartPage nav={navigate} back={back}/>);
              case "Join":k
                  return (<JoinPage nav={navigate} back={back}/>);
              case "Wait":
                  return (<WaitPage nav={navigate} back={back} mode={route.data.mode}/>);
              case "Settings":
                  return (<SettingsPage nav={navigate} back={back} mode={route.data.mode}/>);
              case "Make":
                  return (<MakePage nav={navigate} back={back} mode={route.data.mode}/>);
              case "Zen":
                  return (<ZenPage nav={navigate} back={back} player={route.data.player}/>);
              case "Classic":
                  return (<ClassicPage nav={navigate} back={back} player={route.data.player}/>);
              case "Results":
                  return (<ResultsPage nav={navigate} back={back} data={route.data}/>);
              default:
                  return(<StartPage nav={navigate} back={back}/>);
            }
        }}
    />
    )
  }
}

AppRegistry.registerComponent('WordMerge', () => WordMerge);
