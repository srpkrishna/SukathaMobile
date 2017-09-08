import React, { PropTypes } from 'react';
import {StyleSheet, Text, View,TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import CommonStyles from '../Utils/styles.js';
import Server from '../Utils/server.js';
import Actions from './authActions.js';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Colors from '../Utils/colors.js';
import NavButton from '../Common/navButton.js';
import SendAnalytics from '../Utils/analytics';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,AccessToken,
} = FBSDK;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:Colors.white
  },
  info:{
    marginTop: 50,
    padding:10,
    color:Colors.sBlue,
    fontSize:16
  },
  iconContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.white,
    borderColor:'#3b5998',
    borderWidth:0.5,
    borderRadius:2,
    width: 107,
    height: 40,
    backgroundColor:'#3b5998',
    margin:15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
  },
  fImage:{
    width: 24,
    height: 24,
    marginLeft:6,
    marginBottom:6
  },
  fText:{
    fontFamily:'Lato-Medium',
    fontSize:15,
    fontWeight:'bold',
    color:Colors.white,
    flex:1,
    textAlign:'center',
  }
});


class LoginScreen extends React.Component {

  static  navigationOptions = ({navigation}) => {

    var cancelType = 'back_screen'
    if(navigation.state.params && navigation.state.params.isLoginOptional){
      cancelType = 'next_screen'
    }
    return({
       title: `Login`,
       header:undefined,
       headerLeft:<NavButton title={'Cancel'} page={'login'} action={() =>navigation.dispatch({type: cancelType})}/>,
       headerStyle:{
         backgroundColor:Colors.headerBlue
       },
       headerRight:<View/>,
       headerTitleStyle :{textAlign: 'center',alignSelf:'center',fontFamily: 'Lato-Medium'},
       headerTintColor:'white'
     })
  }

  constructor(){
    super();
    this.initUser = this.initUser.bind(this);
    SendAnalytics.sendEvent('Common','loginLoaded','');
    this.state = {showLoader:false};
  }

  initUser() {
    this.props.fetchUser()
  }

  facebookSignIn(){
    var that = this;
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          that.setState(prevState => ({showLoader:true}));
          that.initUser();
        }
      },
      function(error) {
        alert('Facebook login failed.');
      }
    );

    SendAnalytics.sendEvent('Common','loginLoaded','facebookSignIn');
  }

  googleSignIn(){
    var that = this;
    GoogleSignin.signIn()
    .then((user) => {
      that.setState({showLoader:true});
      that.props.setGUser(user);
    })
    .catch((err) => {
      alert('Google login failed.');
    })
    .done();
    SendAnalytics.sendEvent('Common','loginLoaded','googleSignIn');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.isLoggedIn){
      this.props.goToNextScreen();
    }
  }

  render(){

    //publishPermissions={["publish_actions"]}
    // <LoginButton style={{width: 148, height: 48}}
    //     readPermissions={['public_profile','email']}
    //     onLoginFinished={
    //       (error, result) => {
    //         if (error) {
    //           alert("Login failed with error: " + result.error);
    //         } else if (result.isCancelled) {
    //           alert("Login was cancelled");
    //         } else {
    //           this.initUser();
    //         }
    //       }
    //     }
    //     onLogoutFinished={() => alert("User logged out")}/>
    //
    // <GoogleSigninButton
    //   style={{width: 148, height: 48}}
    //   size={GoogleSigninButton.Size.Icon}
    //   color={GoogleSigninButton.Color.Dark}
    //   onPress={this.googleSignIn.bind(this)}/>
    if(this.state.showLoader){
      return(<View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>)
    }

    return(
    <View style={styles.container}>
      <Text style={styles.info}>Please login to procceed</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.facebookSignIn.bind(this)}>
          <View style={styles.icon} >
            <Image style={styles.fImage} source={require('../Icons/fb.png')} />
            <Text style={styles.fText}>Sign in</Text>
          </View>
        </TouchableOpacity>
        <GoogleSigninButton
          style={{width: 115, height: 48}}
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Light}
          onPress={this.googleSignIn.bind(this)} />
      </View>
    </View>)
  }
}





export default LoginScreen;
