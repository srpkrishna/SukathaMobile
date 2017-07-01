'use strict';

import Constants from './profileConstants';

const defaultState = {
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case Constants.MyDetailsFetch:
        var newState = Object.assign({}, state);
        newState.author =  action.myData.author;
        newState.stories = action.myData.stories;
        newState.seriesList = action.myData.series;
        return newState;
      default:
        return state;
    }
}

export default reducer;
