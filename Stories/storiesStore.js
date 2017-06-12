'use strict';

import Constants from './storiesConstants';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware,combineReducers } from 'redux';

const defaultState = {
  stories: []
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.StoriesChangeEvent:
        var newState = Object.assign({}, state);
        newState.stories =  action.stories;
        return newState;
      case Constants.MoreStoriesSuccess:
        var newState = Object.assign({}, state);

        if(action.stories && action.stories.length == 0){
          newState.reachedEnd = true;
        }else{
          newState.stories =  newState.stories.concat(action.stories);
        }

        return newState;

      case Constants.StoryChangeEvent:
        var newState = Object.assign({}, state);
        var viewerStory = Object.assign({}, state.selectedStory);
        var selectedStory = Object.assign({}, viewerStory);
        var element = action.element;
        selectedStory.social[element] = action.attributes.social[element]
        newState.selectedStory = selectedStory;

        if(state.stories && state.stories.length > 0){
          let array = state.stories.map((story) => {
              if (story.author === viewerStory.author &&
                    story.timestamp === viewerStory.timestamp) {
                var newStory =  Object.assign({}, story)
                newStory.social[element] = action.attributes.social[element]
                return newStory
              }
              return story
            })

          newState.stories = array;
        }
        return newState;

      case Constants.StoryContentSuccess:
        var newState = Object.assign({}, state);
        newState.selectedContent = action.content;
        return newState;
      case Constants.StoryAuthorDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedAuthor = action.author;
        const link = "/author/"+action.author.penName;
        const linkObj = {
            pathname:link,
            state:action.author
        }
        newState.authorLink = linkObj;
        return newState;
      case Constants.StoryDetailsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedStory = action.story;
        return newState;
      case Constants.StoryCommentsSuccess:
        var newState = Object.assign({}, state);
        newState.selectedStoryComments = action.comments;
        return newState;
      case Constants.StoryCommentPostSuccess:
        var newState = Object.assign({}, state);

        if(!newState.selectedStoryComments){
          newState.selectedStoryComments = [action.comment]
        }else{
          var comments = Object.assign([], newState.selectedStoryComments);
          comments.splice( 0, 0, action.comment)
          newState.selectedStoryComments = comments
        }
        return newState;
      case Constants.StoryMoreCommentsSuccess:
        var newState = Object.assign({}, state);

        if(!newState.selectedStoryComments){
          newState.selectedStoryComments = [action.comment]
        }else{
          var comments = Object.assign([], newState.selectedStoryComments);
          newState.selectedStoryComments = comments.concat(action.comments)
        }
        return newState;
      default:
        return state;
    }
}

const middlewares = [thunkMiddleware];// lets us dispatch() functions
const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)
export default store
