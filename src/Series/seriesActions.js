'use strict';
import  Constants from './seriesConstants';
import Server from '../Utils/server';


function networkError(){
  var obj =  {
    type:Constants.SeriesNetworkError
  };
  return obj
}

function fetchSuccess(seriesList){
  return {
    type:Constants.SeriesListChangeEvent,
    seriesList:seriesList
  };
}

function shouldFetchSeriesList(state) {
  const seriesList = state.seriesList
  if (!seriesList || seriesList.length == 0) {
    return true;
  } else {
    return false;
  }
}

function fetchSeriesListIfNeeded() {
  return function(dispatch, getState){
    if (shouldFetchSeriesList(getState())) {
      return dispatch(fetchSeriesList())
    };
  };
}

function fetchSeriesList(){
  return function(dispatch) {
    Server.fetch('series?limit=4',function(data){
        dispatch(fetchSuccess(data))
    },function(){
      dispatch(networkError())
    });
  }
}

function moreSeriesSuccess(data){
  return {
    type:Constants.MoreSeriesSuccess,
    seriesList:data,
  };
}

function getMoreSeries(){
    return function(dispatch,getState){
      const seriesList = getState().seriesStore.seriesList
      var lastItem = seriesList[seriesList.length-1]
      var q = "?limit=4"
      if(lastItem){
        q = q+"&lastts="+lastItem.lastUpdated
      }

      Server.fetch('series'+q,function(data){
        if(!data.code)
          dispatch(moreSeriesSuccess(data))
        else{
          dispatch(moreSeriesSuccess([]))
        }
      },function(){
        dispatch(networkError())
      });
    }
}

function clearSelectedState(series,episode){
  return{
    type:Constants.SeriesClearSelectedState,
    series:series,
    episode:episode
  }
}


function commentsSuccess(data){
  return {
    type:Constants.SeriesCommentsSuccess,
    comments:data,
  };
}

function fetchComments(authorId,id,episode){
    return function(dispatch){
      var postId = authorId + id

      if(episode)
        postId = postId + episode
      Server.fetch('comments/'+postId,function(data){
          if(!data.code){
              dispatch(commentsSuccess(data))
          }
        });
    }
}

function moreCommentsSuccess(data){
  return {
    type:Constants.SeriesMoreCommentsSuccess,
    comments:data,
  };
}

function getMoreComments(series,episodeNumber,lastTimeStamp){
    return function(dispatch){

      var postId = series.author + series.timestamp
      if(episodeNumber){
        postId = postId + episodeNumber
      }

      var q = ""
      if(lastTimeStamp){
        q = "?lastts="+lastTimeStamp
      }

      Server.fetch('comments/'+postId+q,function(data){
          if(!data.code){
              dispatch(moreCommentsSuccess(data))
          }
        });
    }
}


function commentPostedSuccessfully(comment){
  return {
    type:Constants.SeriesCommentPostSuccess,
    comment:comment,
  };
}


function publishComment(comment,series,author,episodeNumber){
    return function(dispatch,getState) {

      var postId = series.author + series.timestamp

      if(episodeNumber){
        postId = postId + episodeNumber
      }

      if(author && author.email){
        comment.authorEmail = author.email
      }
      comment.authorName = series.authorDisplayName
      comment.storyName = series.displayName

      Server.connect('POST','comments/'+postId,comment,function(data){
          if(data.code){
            console.log("error publishing comments")
          }else{
            dispatch(commentPostedSuccessfully(data));
          }

      });
    }
}

function updateSuccess(attributes,element){
  return {
    type:Constants.SeriesChangeEvent,
    attributes:attributes,
    element:element
  };
}

function updateSocial(element,seriesId){

  return function(dispatch,getState) {

    const body = {
      id:seriesId,
      updateAttr:"social",
      updateKey:element
    }
    Server.connect('POST','series',body,function(data){
        if(!data.code)
          dispatch(updateSuccess(data,element))
    });

  }
}

function contentSuccess(data,episodeNumber){
  return {
    type:Constants.SeriesContentSuccess,
    content:data,
    episode:episodeNumber
  };
}

function getSeriesContent(authorId,name,episodeNumber){
  return function(dispatch) {
    var episode = name
    if(episodeNumber){
      episode = episode + '/'+episodeNumber
    }
    dispatch(contentSuccess(undefined,episodeNumber))
    Server.fetch('series/content/'+authorId+'/'+episode,function(data){
        dispatch(contentSuccess(data,episodeNumber))
    },function(){
      dispatch(networkError())
    });
  }
}

function seriesDetailsSuccess(data,episode){

  if(!data || !data.timestamp){
    return
  }
  return {
    type:Constants.SeriesDetailsSuccess,
    series:data,
    episode:episode
  };
}

function getSeriesDetails(authorId,id,episode){
  return function(dispatch) {
    Server.fetch('series/'+authorId+'/'+id,function(data){
        dispatch(seriesDetailsSuccess(data,episode))
    });
  }
}

function seriesAuthorDetailsSuccess(data){
  return {
    type:Constants.SeriesAuthorDetailsSuccess,
    author:data,
  };
}

function getAuthorDetails(authorId){
  return function(dispatch) {
    Server.fetch('authors/'+authorId,function(data){
        dispatch(seriesAuthorDetailsSuccess(data))
    });
  }
}

const Actions = {
    fetchSeriesList:fetchSeriesList,
    fetchSeriesListIfNeeded:fetchSeriesListIfNeeded,
    getSeriesContent:getSeriesContent,
    updateSocial:updateSocial,
    getAuthorDetails:getAuthorDetails,
    seriesAuthorDetailsSuccess:seriesAuthorDetailsSuccess,
    getSeriesDetails:getSeriesDetails,
    seriesDetailsSuccess:seriesDetailsSuccess,
    publishComment:publishComment,
    getComments:fetchComments,
    getMoreComments:getMoreComments,
    getMoreSeries:getMoreSeries,
    clearSelectedState:clearSelectedState
};

export default Actions
