'use strict';

import Constants from './wallConstants.js';

const defaultState = {
  items: []
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

      case Constants.SearchListScroll:
        var newState = Object.assign({}, state);
        newState.searchListScrolled = true;
        return newState;

      case Constants.SearchBegin:
        var newState = Object.assign({}, state);
        newState.backup = state.items
        newState.items = []
        newState.isSearchEnabled = true;
        newState.searchListScrolled = false;
        return newState;

      case Constants.SearchCancel:
        var newState = Object.assign({}, state);
        newState.backup = []
        newState.items = state.backup
        newState.isSearchEnabled = false;
        newState.searchListScrolled = false;
        newState.isSearchLoading = false;
        newState.noResultsFound = false;
        return newState;

      case Constants.ItemsNetworkError:
        var newState = Object.assign({}, state);
        newState.isNetworkError = true
        return newState;

      case Constants.SearchLoading:
        var newState = Object.assign({}, state);
          newState.noResultsFound = false;
          newState.searchListScrolled = false;
        if(action.searchText.length < 3){
          newState.isSearchLoading = false;
          if(action.searchText.length === 0){
            newState.items = []
          }
        }else{
          newState.isSearchLoading = true
        }

        return newState;

      case Constants.SearchItemsChangeEvent:
        var newState = Object.assign({}, state);
        newState.isNetworkError = false;
        newState.isSearchLoading = false;
        newState.searchListScrolled = false;
        newState.items = action.items;
        if(action.items.length == 0){
          newState.noResultsFound = true;
        }else{
          newState.noResultsFound = false;
        }

        return newState;
      case Constants.ItemsChangeEvent:
        var newState = Object.assign({}, state);
        newState.isNetworkError = false;
        if(action.isReachedEnd){
          newState.isReachedEnd = true
        }else{
          newState.isReachedEnd = false
          if(action.isAppend){
            newState.items =  newState.items.concat(action.items);
          }else{
            newState.items = action.items;
          }
          var currentDate = new Date()
          newState.lastTimeStamp = action.lastTimeStamp
          newState.lastUpdatedAt = currentDate.getTime()
        }
        return newState;

      case Constants.ItemUpdateSocial:
        var newState = Object.assign({}, state);
        newState.isNetworkError = false;

        var viewerStory = action.item;
        if(newState.items && newState.items.length > 0){
          newState.items.map((story) => {
              if (story.author === viewerStory.author &&
                    story.timestamp === viewerStory.timestamp) {
                var lhsSocial = JSON.stringify(story.social)
                var rhsSocial = JSON.stringify(viewerStory.social)

                if(lhsSocial !== rhsSocial){
                  story.social = viewerStory.social
                }
              }
            })
        }
        return newState;

      default:
        return state;
    }
}

export default reducer
