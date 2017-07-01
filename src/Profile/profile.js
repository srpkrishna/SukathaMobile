import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View,Image } from 'react-native';
import CommonStyles from '../Utils/styles.js';
import AuthController from '../Auth/authController.js';
import ProfileScreen from './profileScreen.js'


class Profile extends React.Component {

  render(){

    if(this.props.user.isLoggedIn){
      return(
        <ProfileScreen data={this.props}/>
      );
    }else{
      return(<AuthController />);
    }

  }
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  // Note: By default the icon is only shown on iOS. Search the showIcon option below.
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('../Icons/ic_person.png')}
      style={[CommonStyles.icon, {tintColor: tintColor}]}
    />
  ),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Profile;
