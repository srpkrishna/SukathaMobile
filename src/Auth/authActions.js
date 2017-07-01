'use strict';
import  Constants from './authConstants';
import Server from '../Utils/server';
import {GoogleSignin} from 'react-native-google-signin';

const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
} = FBSDK;


function loginUserSuccess(user){
  return {
    type:Constants.Login_Success_Event,
    user:user
  };
}

function fetchUser(){
  return function(dispatch) {
    AccessToken.getCurrentAccessToken().then((data) => {
      if(!data){
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
        return dispatch(loginUserSuccess(user));
      });
    })

    GoogleSignin.configure({
      iosClientId:'113332297879-rs9jdb2c1dp8memqqe42sm7fr4l6pb1q.apps.googleusercontent.com', // only for iOS
      webClientId:'113332297879-2c0bl4e42qokglovtthficb1ubvldgch.apps.googleusercontent.com'
    })
    .then(() => {
      GoogleSignin.currentUserAsync().then((json) => {

          if(!json){return}

          var user = {}
          user.name = json.name;
          user.id = json.id;
          user.email = json.email;
          user.imageUrl = json.photo;
          user.token = json.idToken;
          user.service = 'google';
          return dispatch(loginUserSuccess(user));

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

const Actions = {
    fetchUser:fetchUser,
    loginUserSuccess:loginUserSuccess,
    setGoogleUser:setGoogleUser
};

export default Actions
