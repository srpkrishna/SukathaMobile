import React from 'react';
import Home from './Home/home.js';
import { StatusBar } from 'react-native';

StatusBar.setBarStyle('light-content', true);
StatusBar.setTranslucent(true);
export default class App extends React.Component {
  render() {
    return (
       <Home />
    );
  }
}
