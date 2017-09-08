'use strict';
import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../Utils/colors.js';
import SendAnalytics from '../Utils/analytics';
import Utils from '../Utils/utilityFunctions.js';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Medium',
    color:Colors.white,
    paddingRight:10
  }
});

export default class AuthButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }

  logout(){

    if(this.props.user.isLoggedIn){
        this.props.logout(this.props.user);
        SendAnalytics.sendEvent('Common','ProfileLoggedOut',this.props.user.email);
        Utils.showAlert('Logged out successfully.');
    }else {
      SendAnalytics.sendEvent('Common','ProfileLoggedIn','');
      this.props.openLogin()
    }
  }

  render(){

    var actionName = 'Login'
    if(this.props.user.isLoggedIn){
      actionName = 'Logout'
    }

    return(
      <TouchableOpacity onPress={this.logout.bind(this)}>
        <Text style={styles.text}>{actionName}</Text>
      </TouchableOpacity>
    );

  }
}
