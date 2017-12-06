'use strict';
import  Constants from './authConstants';
import Server from '../Utils/server';
import {GoogleSignin} from 'react-native-google-signin';
import SendAnalytics from '../Utils/analytics';
import DeviceInfo from 'react-native-device-info';
import Notifications from '../Common/notifications.js';
import {Platform} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,AccessToken
} = FBSDK;

var isUserGoogleReg = true
var isUserFBReg = true

function loginUserSuccess(user){
  return {
    type:Constants.Login_Success_Event,
    user:user
  };
}

function fetchClientTokenWithId(){
  if(!isUserGoogleReg && !isUserFBReg){
    var clientID = DeviceInfo.getUniqueID();
    var version = DeviceInfo.getVersion();
    var client = {
      id:clientID,
      platform:Platform.OS,
      version:version
    }

    Notifications.register(client)
    SendAnalytics.setUserId(clientID);
  }
}

function fetchClientTokenWithEmail(user){
  return function(dispatch) {
    var clientID = DeviceInfo.getUniqueID();
    var version = DeviceInfo.getVersion();
    var client = {
      id:clientID,
      platform:Platform.OS,
      email:user.email,
      version:version
    }

    Server.connect('POST','user',user,function(data){
        if(!data.code){
            SendAnalytics.setUserId(data.id);
            client.userId = data.id
            Notifications.register(client)
            user.userId = data.id
            return dispatch(loginUserSuccess(user));
        }
    });
  }
}

function fetchUser(){
  return function(dispatch) {
    AccessToken.getCurrentAccessToken().then((data) => {
      if(!data){
        isUserFBReg = false
        fetchClientTokenWithId()
        return
      }
      const { accessToken } = data


      var fbUrl = 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture&access_token='+accessToken
      Server.directFetch(fbUrl,function(json){
        var user = {}
        user.name = json.name;
        user.id = json.id;
        user.email = json.email;
        user.imageUrl = json.picture.data.url;
        user.token = accessToken;
        user.service = 'fb';

        return dispatch(fetchClientTokenWithEmail(user));
      });
    })

    GoogleSignin.configure({
      iosClientId:'113332297879-rs9jdb2c1dp8memqqe42sm7fr4l6pb1q.apps.googleusercontent.com', // only for iOS
      webClientId:'113332297879-2c0bl4e42qokglovtthficb1ubvldgch.apps.googleusercontent.com'
    })
    .then(() => {
      GoogleSignin.currentUserAsync().then((json) => {

          if(!json){
            isUserGoogleReg = false;
            fetchClientTokenWithId()
            return
          }

          var user = {}
          user.name = json.name;
          user.id = json.id;
          user.email = json.email;
          user.imageUrl = json.photo;
          user.token = json.idToken;
          user.service = 'google';
          return dispatch(fetchClientTokenWithEmail(user));

        }).done();
    });

  }
}

function setGoogleUser(json){
  var user = {}
  user.name = json.name;
  user.id = json.id;
  user.email = json.email;
  user.imageUrl = json.photo;
  user.token = json.idToken;
  user.service = 'google';
  return loginUserSuccess(user);
}

function logoutUserSuccess(){
  return {
    type:Constants.Logout_Success_Event
  };
}

function logout(user){
  return function(dispatch) {
    if(user.service == 'google'){
      GoogleSignin.signOut().then(() => {
      }).catch((err) => {
      });

      return dispatch(logoutUserSuccess());

    }else if(user.service == 'fb'){
      LoginManager.logOut()
      return dispatch(logoutUserSuccess());
    }
  }
}

const Actions = {
    fetchUser:fetchUser,
    setGoogleUser:setGoogleUser,
    logout:logout
};

export default Actions
