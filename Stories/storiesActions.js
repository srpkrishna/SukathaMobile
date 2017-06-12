'use strict';
import  Constants from './storiesConstants';
import Server from '../Utils/server';


function fetchSuccess(stories){
  return {
    type:Constants.StoriesChangeEvent,
    stories:stories
  };
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
    Server.fetch('stories',function(data){
        dispatch(fetchSuccess(data))
    });
  }
}

function moreStoriesSuccess(data){
  return {
    type:Constants.MoreStoriesSuccess,
    stories:data,
  };
}

function getMoreStories(){
    return function(dispatch,getState){
      const stories = getState().stories
      var story = stories[stories.length-1]
      var q = ""
      if(story){
        q = "?lastts="+story.timestamp
      }

      Server.fetch('stories'+q,function(data){
          dispatch(moreStoriesSuccess(data))
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

function getMoreComments(){
    return function(dispatch,getState){
      const story = getState().selectedStory
      const postId = story.author + story.timestamp
      const comments = getState().selectedStoryComments
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
      SA.sendEvent('Story','moreComments',story.name.removeSpaceAndCapitals());
    }
}


function commentPostedSuccessfully(comment){
  return {
    type:Constants.StoryCommentPostSuccess,
    comment:comment,
  };
}


function publishComment(comment){
    return function(dispatch,getState) {
      const story = getState().selectedStory
      const postId = story.author + story.timestamp
      const author = getState().selectedAuthor
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
      SA.sendEvent('Story','publishComment',story.name.removeSpaceAndCapitals());
    }
}

function updateSuccess(attributes,element){
  return {
    type:Constants.StoryChangeEvent,
    attributes:attributes,
    element:element
  };
}

function updateSocial(element){

  return function(dispatch,getState) {
    const story = getState().selectedStory

    if(!story){
      return
    }
    const storyId = {
      author:story.author,
      timestamp:story.timestamp
    }

    const body = {
      id:storyId,
      updateAttr:"social",
      updateKey:element
    }
    Server.connect('POST','stories',body,function(data){
        if(!data.code)
          dispatch(updateSuccess(data,element))
    });

    if(!("views" === element || "reads" === element))
      SA.sendEvent('Story',element,story.name.removeSpaceAndCapitals());
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
    });
  }
}

function storyDetailsSuccess(data){

  if(!data || !data.timestamp){
    window.location.replace("/")
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
    getMoreStories:getMoreStories
};

export default Actions
