'use strict';
import  Constants from './storiesConstants';
import Server from '../Utils/server';


function networkError(){
  var obj =  {
    type:Constants.StoriesNetworkError
  };
  return obj
}

function fetchSuccess(stories,genre){
  var obj =  {
    type:Constants.StoriesChangeEvent,
    stories:stories
  };

  if(genre){
    obj.genre = genre
  }
  return obj
}

function shouldFetchStories(state) {
  const stories = state.stories
  if (!stories || stories.length == 0) {
    return true;
  } else {
    return false;
  }
}

function fetchStoriesIfNeeded() {
  return function(dispatch, getState){
    if (shouldFetchStories(getState())) {
      return dispatch(fetchStories())
    };
  };
}

function fetchStories(){
  return function(dispatch) {
    Server.fetch('stories?limit=4',function(data){
        dispatch(fetchSuccess(data))
    },function(){
      dispatch(networkError())
    });
  }
}

function moreStoriesSuccess(data){
    var obj = {
      type:Constants.MoreStoriesSuccess,
      stories:data,
    };
    return obj
}

function getMoreStories(){
    return function(dispatch,getState){
      const stories = getState().storiesStore.stories
      var story = stories[stories.length-1]
      var q = "?limit=4"

      var filter = getState().storiesStore.filter
      if(filter){
        q = "?limit=50"
        q=q+"&genre="+filter
      }

      if(story){
        q = q+"&lastts="+story.timestamp
      }



      Server.fetch('stories'+q,function(data){
          if(!data.code)
            dispatch(moreStoriesSuccess(data))
          else{
            dispatch(moreStoriesSuccess([]))
          }
      },function(){
        dispatch(networkError())
      });
    }
}

function getFilteredStories(genre){
    return function(dispatch,getState){
      var q = "?limit=100&genre="+genre
      Server.fetch('stories'+q,function(data){
          dispatch(fetchSuccess(data,genre))
      },function(){
        dispatch(networkError())
      });
    }
}


function commentsSuccess(data){
  return {
    type:Constants.StoryCommentsSuccess,
    comments:data,
  };
}

function fetchComments(authorId,id){
    return function(dispatch){
      const postId = authorId + id
      Server.fetch('comments/'+postId,function(data){
          if(!data.code){
              dispatch(commentsSuccess(data))
          }
        });
    }
}

function moreCommentsSuccess(data){
  return {
    type:Constants.StoryMoreCommentsSuccess,
    comments:data,
  };
}

function getMoreComments(story,lastTimeStamp){
    return function(dispatch,getState){
      const postId = story.author + story.timestamp
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
    type:Constants.StoryCommentPostSuccess,
    comment:comment,
  };
}


function publishComment(comment,story,author){
    return function(dispatch) {
      const postId = story.author + story.timestamp

      if(author && author.email){
        comment.authorEmail = author.email
      }
      comment.authorName = story.authorDisplayName
      comment.storyName = story.displayName

      Server.connect('POST','comments/'+postId,comment,function(data){
          if(data.code){
            console.log("error publishing comments")
          }else{
            dispatch(commentPostedSuccessfully(data));
          }

      });
    }
}

function clearSelectedState(story){
  return{
    type:Constants.StoryClearSelectedState,
    story:story
  }
}

function updateSuccess(attributes,element){
  return {
    type:Constants.StoryChangeEvent,
    attributes:attributes,
    element:element
  };
}

function updateSocial(element,storyId){

  return function(dispatch,getState) {
    const body = {
      id:storyId,
      updateAttr:"social",
      updateKey:element
    }
    Server.connect('POST','stories',body,function(data){
        if(!data.code)
          dispatch(updateSuccess(data,element))
    });
  }
}

function contentSuccess(data){
  return {
    type:Constants.StoryContentSuccess,
    content:data,
  };
}

function getStoryContent(authorId,name){
  return function(dispatch) {
    Server.fetch('stories/content/'+authorId+'/'+name,function(data){
        dispatch(contentSuccess(data))
    },function(){
      dispatch(networkError())
    });
  }
}

function storyDetailsSuccess(data){

  if(!data || !data.timestamp){
    return
  }
  return {
    type:Constants.StoryDetailsSuccess,
    story:data,
  };
}

function getStoryDetails(authorId,id){
  return function(dispatch) {
    Server.fetch('stories/'+authorId+'/'+id,function(data){
        dispatch(storyDetailsSuccess(data))
    });
  }
}

function storyAuthorDetailsSuccess(data){
  return {
    type:Constants.StoryAuthorDetailsSuccess,
    author:data,
  };
}

function getAuthorDetails(authorId){
  return function(dispatch) {
    Server.fetch('authors/'+authorId,function(data){
        dispatch(storyAuthorDetailsSuccess(data))
    });
  }
}

function filtersSuccess(filters){
  return {
    type:Constants.StoryFiltersSuccess,
    filters:filters
  };
}

function getFilters(){
    return function(dispatch,getState){
      Server.fetch('stories/filters',function(data){
          dispatch(filtersSuccess(data))
      });
    }
}

const Actions = {
    fetchStories:fetchStories,
    fetchStoriesIfNeeded:fetchStoriesIfNeeded,
    getStoryContent:getStoryContent,
    updateSocial:updateSocial,
    getAuthorDetails:getAuthorDetails,
    storyAuthorDetailsSuccess:storyAuthorDetailsSuccess,
    getStoryDetails:getStoryDetails,
    storyDetailsSuccess:storyDetailsSuccess,
    publishComment:publishComment,
    getComments:fetchComments,
    getMoreComments:getMoreComments,
    getMoreStories:getMoreStories,
    clearSelectedState:clearSelectedState,
    getFilteredStories:getFilteredStories,
    getFilters:getFilters
};

export default Actions
