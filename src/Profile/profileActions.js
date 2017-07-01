'use strict';
import  Constants from './profileConstants';
import Server from '../Utils/server.js';

function myDetailsSuccess(data){
  return {
    type:Constants.MyDetailsFetch,
    myData:data
  }
}

function myStoriesSuccess(data){
  return{
    type:Constants.MyStoriesFetch,
    stories:data
  }
}

function mySeriesSuccess(data){
  return{
    type:Constants.MySeriesFetch,
    stories:data
  }
}

function getMyDetails(user){
    return function(dispatch){
      const body = {
        id:user.email,
        token:user.token,
        service:user.service
      }
      Server.connect('POST','profile/me',body,function(data){
          dispatch(myDetailsSuccess(data));
      });
    }
}

function getMyStories(penName){
  return function(dispatch){
    const body = {
      id:penName
    }
    Server.connect('POST','profile/stories',body,function(data){
        dispatch(myStoriesSuccess(data));
    });
  }
}

function getMySeries(penName){
  return function(dispatch){
    const body = {
      id:penName
    }
    Server.connect('POST','profile/series',body,function(data){
        dispatch(mySeriesSuccess(data));
    });
  }
}

const Actions = {
    getMyDetails:getMyDetails
};

export default Actions
