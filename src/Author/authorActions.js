'use strict';
import  Constants from './authorConstants.js';
import Server from '../Utils/server.js';

function authorDetailsSuccess(data){
  return {
    type:Constants.AuthorDetailsFetch,
    author:data
  }
}

function authorStoriesSuccess(data){
  return{
    type:Constants.AuthorStoriesFetch,
    stories:data
  }
}

function getAuthorDetails(authorId){
    return function(dispatch){
      Server.fetch('authors/'+authorId,function(data){
          dispatch(authorDetailsSuccess(data));
      });
    }
}

function getAuthorStories(authorId){
  return function(dispatch){
    Server.fetch('stories/'+authorId,function(data){
        dispatch(authorStoriesSuccess(data));
    });
  }
}

function authorSeriesSuccess(data){
  return{
    type:Constants.AuthorSeriesFetch,
    seriesList:data
  }
}

function getAuthorSeries(authorId){
  return function(dispatch){
    Server.fetch('series/'+authorId,function(data){
        dispatch(authorSeriesSuccess(data));
    });
  }
}

function clearAuthorState(author){
  return{
    type:Constants.ClearAuthorState,
    author:author
  }
}

const Actions = {
    getAuthorDetails:getAuthorDetails,
    getAuthorStories:getAuthorStories,
    authorDetailsSuccess:authorDetailsSuccess,
    getAuthorSeries:getAuthorSeries,
    clearAuthorState:clearAuthorState


};

export default Actions
