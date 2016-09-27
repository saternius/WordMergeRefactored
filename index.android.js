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

class WordMerge extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
       <Navigator
          initialRoute={{
            page: "Home",
            data:{ id: 1, name: 'Tai Lopez', wins: '27', pic: require('./images/tai.png') }
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
              // case "SignUp":
              //     return (<SignUpPage/>);
              // case "Start":
              //     return (<StartPage/>);
              // case "GameSettings":
              //     return (<GameSettingsPage classic={route.data.classic}/>);
              // case "LobbyAny":
              //     return (<LobbyAnyPage classic={route.data.classic}/>);
              // case "LobbyFriend":
              //     return (<LobbyAnyPage friend={route.data}/>);
              // case "LobbyMake":
              //     return (<LobbyMakePage classic={route.data.classic}/>);
              // case "LobbyJoin":
              //     return (<LobbyJoinPage classic={route.data.classic}/>);
              // case "Friends":
              //     return (<FriendsPage/>);
              // case "Achievements":
              //     return (<AchievementsPage/>);
              // case "Instructions":
              //     return (<InstructionsPage/>);
              // case "Classic":
              //     return (<ClassicPage friend={route.data}/>);
              // case "Zen":
              //     return (<ZenPAge friend={route.data}/>);
              // case "Results":
              //     return (<ResultPage friend={route.data.friend} won={route.data.won}/>);
              default:
                  return(<HomePage nav={navigate} back={back}/>);
            }

        }}
    />
    )
  }
}

AppRegistry.registerComponent('WordMerge', () => WordMerge);
