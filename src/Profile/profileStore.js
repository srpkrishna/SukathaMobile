'use strict';

import Constants from './profileConstants';

const defaultState = {
  isDataLoaded:false
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.MyDetailsFetch:
        var newState = Object.assign({}, state);

        newState.isDataLoaded = true;
        if(!action.myData.author){
          newState.isAuthor = false;
          return newState;
        }
        newState.isAuthor = true;
        newState.author =  action.myData.author;
        newState.stories = action.myData.stories;
        newState.seriesList = action.myData.series;
        return newState;

      case Constants.ClearProfile:
        return ({
          isDataLoaded:false
        });
      default:
        return state;
    }
}

export default reducer;
