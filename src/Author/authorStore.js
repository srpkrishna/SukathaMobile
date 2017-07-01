'use strict';

import Constants from './authorConstants';

const defaultState = {
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.AuthorStoriesFetch:
        var newState = Object.assign({}, state);
        newState.stories =  action.stories;
        return newState;
      case Constants.AuthorSeriesFetch:
        var newState = Object.assign({}, state);
        newState.seriesList =  action.seriesList;
        return newState;
      case Constants.AuthorDetailsFetch:
        var newState = Object.assign({}, state);
        newState.author =  action.author;
        return newState;
      case Constants.ClearAuthorState:
        if(!state.author){
          return state;
        }

        if(action.author.penName !==  state.author.penName){
          var newState = Object.assign({}, state);
          newState.seriesList = undefined;
          newState.stories = undefined;
          return newState;
        }
        return state;

      default:
        return state;
    }
}

export default reducer
