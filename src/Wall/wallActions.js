'use strict';
import  Constants from './wallConstants';
import Server from '../Utils/server';

function networkError(){
  var obj =  {
    type:Constants.ItemsNetworkError
  };
  return obj
}

function searchBegin(){
  return {
    type:Constants.SearchBegin
  };
}

function searchCancel(){
  return {
    type:Constants.SearchCancel
  };
}

function SearchLoading(value){
  return {
    type:Constants.SearchLoading,
    searchText:value
  };
}

function onSearchListScroll(){
  return {
    type:Constants.SearchListScroll
  };
}

function searchItemsSuccess(results){
  return {
    type:Constants.SearchItemsChangeEvent,
    items:results
  };
}

function searchItems(value){
  return function(dispatch) {
    dispatch(SearchLoading(value))
    if(value.length<3){
      return
    }
    const param = encodeURI(value);
    Server.fetch('wall/search?q='+param,
      function(data){
        dispatch(searchItemsSuccess(data));
      },function(){
        dispatch(networkError())
      }
    );
  }
}

function updateSocial(storyItem){
  return {
    type:Constants.ItemUpdateSocial,
    item:storyItem
  };
}

function getItemsSuccess(results,isReachedEnd,isAppend,lastTimeStamp){
  return {
    type:Constants.ItemsChangeEvent,
    items:results,
    isReachedEnd:isReachedEnd,
    isAppend:isAppend,
    lastTimeStamp:lastTimeStamp
  };
}

function getItems(score,lastTimeStamp,isAppend){
  return function(dispatch) {

    var url = 'wall?limit=30&score='+score
    if(lastTimeStamp){
      url = url+'&lastts='+lastTimeStamp
    }

    Server.fetch(url,function(data){
        if(data.code){
          dispatch(getItemsSuccess([],false,isAppend,lastTimeStamp));
        }else{
          var isReachedEnd = false
          if(data.length == 0){
            isReachedEnd = true
          }
          dispatch(getItemsSuccess(data,isReachedEnd,isAppend,lastTimeStamp));
        }

    },function(){
      dispatch(networkError())
    });
  }
}

const Actions = {
    getItems:getItems,
    searchItems:searchItems,
    searchBegin:searchBegin,
    searchCancel:searchCancel,
    onSearchListScroll:onSearchListScroll,
    updateSocial:updateSocial
};

export default Actions
