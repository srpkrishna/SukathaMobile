import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View,Image } from 'react-native';
import CommonStyles from '../Utils/styles.js';
import Server from '../Utils/server.js';
import Actions from './authActions.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken,
} = FBSDK;

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


class LoginScreen extends React.Component {

  constructor(){
    super();
    this.initUser = this.initUser.bind(this);
  }

  initUser(token) {
    this.props.fetchUser()
  }

  googleSignIn(){
    GoogleSignin.signIn()
    .then((user) => {
      this.props.setGUser(user);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render(){
    //publishPermissions={["publish_actions"]}

    return(
    <View style={styles.container}>
      <LoginButton
          readPermissions={['public_profile','email']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                this.initUser();
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>

      <GoogleSigninButton
        style={{width: 48, height: 48}}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.googleSignIn.bind(this)}/>
    </View>)
  }
}

// LoginScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };
//
// LoginScreen.navigationOptions = {
//   title: 'Log In',
// };


export default LoginScreen;
