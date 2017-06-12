'use strict';
import  Constants from './seriesConstants';
import Server from '../Utils/server';


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
    Server.fetch('series',function(data){
        dispatch(fetchSuccess(data))
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
      const seriesList = getState().seriesList
      var lastItem = seriesList[seriesList.length-1]
      var q = ""
      if(lastItem){
        q = "?lastts="+lastItem.lastUpdated
      }

      Server.fetch('series'+q,function(data){
          dispatch(moreSeriesSuccess(data))
      });
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

function getMoreComments(){
    return function(dispatch,getState){
      const series = getState().selectedSeries
      var postId = series.author + series.timestamp
      if(getState().selectedEpisode){
        postId = postId + getState().selectedEpisode
      }

      const comments = getState().selectedSeriesComments
      var comment = comments[comments.length-1]
      var q = ""
      if(comment){
        q = "?lastts="+comment.timestamp
      }

      Server.fetch('comments/'+postId+q,function(data){
          if(!data.code){
              dispatch(moreCommentsSuccess(data))
          }
        });
      SA.sendEvent('Series','moreComments',series.name.removeSpaceAndCapitals());
    }
}


function commentPostedSuccessfully(comment){
  return {
    type:Constants.SeriesCommentPostSuccess,
    comment:comment,
  };
}


function publishComment(comment){
    return function(dispatch,getState) {
      const series = getState().selectedSeries
      var postId = series.author + series.timestamp

      if(getState().selectedEpisode){
        postId = postId + getState().selectedEpisode
      }

      const author = getState().selectedAuthor
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
      SA.sendEvent('Series','publishComment',series.name.removeSpaceAndCapitals());
    }
}

function updateSuccess(attributes,element){
  return {
    type:Constants.SeriesChangeEvent,
    attributes:attributes,
    element:element
  };
}

function updateSocial(element){

  return function(dispatch,getState) {
    const series = getState().selectedSeries

    if(!series){
      return
    }
    const seriesId = {
      author:series.author,
      timestamp:series.timestamp
    }

    const body = {
      id:seriesId,
      updateAttr:"social",
      updateKey:element
    }
    Server.connect('POST','series',body,function(data){
        if(!data.code)
          dispatch(updateSuccess(data,element))
    });

    if(!("views" === element || "reads" === element))
      SA.sendEvent('Series',element,series.name.removeSpaceAndCapitals());
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
    Server.fetch('series/content/'+authorId+'/'+episode,function(data){
        dispatch(contentSuccess(data,episodeNumber))
    });
  }
}

function seriesDetailsSuccess(data){

  // if(!data || !data.timestamp){
  //   window.location.replace("/")
  // }
  return {
    type:Constants.SeriesDetailsSuccess,
    series:data,
  };
}

function getSeriesDetails(authorId,id){
  return function(dispatch) {
    Server.fetch('series/'+authorId+'/'+id,function(data){
        dispatch(seriesDetailsSuccess(data))
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
    getMoreSeries:getMoreSeries
};

export default Actions
