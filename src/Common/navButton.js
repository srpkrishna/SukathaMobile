'use strict';
import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';
import SendAnalytics from '../Utils/analytics';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Medium',
    color:Colors.white,
    padding:5
  }
});

export default class NavButton extends React.Component {

  constructor(props) {
    super(props);
  }

  goToScreen(){
    if(this.props.page)
      SendAnalytics.sendEvent('Common',this.props.page+"cancelled",'');
    this.props.action();
  }

  render(){
    return(
      <TouchableOpacity onPress={this.goToScreen.bind(this)}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
