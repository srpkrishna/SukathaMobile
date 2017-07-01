import React from 'react';
import AppWithNavigationState from './src/Home/home.js';
import { StatusBar, View, Platform } from 'react-native';
import Colors from './src/Utils/colors.js';
import { Provider } from 'react-redux';
import Store from './src/Home/homeStore.js';
import AuthActions from './src/Auth/authActions.js';

StatusBar.setBarStyle('light-content', true);
StatusBar.setTranslucent(true);
console.ignoredYellowBox = ['Warning: BackAndroid']
export default class App extends React.Component {

  constructor(){
    super();
    var obj = AuthActions.fetchUser();
    Store.dispatch(obj)
  }
  render() {

    if(Platform.OS === 'ios'){
      return (
         <Provider store={Store} >
           <AppWithNavigationState />
         </Provider>
      );
    }else{
      return (
         <View style={{flex:1}}>
            <View style={{height:20,backgroundColor:Colors.sBlue}} />
            <Provider store={Store} >
              <AppWithNavigationState />
            </Provider>
         </View>
      );
    }

  }
}
