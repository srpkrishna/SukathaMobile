import { connect } from 'react-redux'
import View from './wallView.js'
import  Actions from './wallActions.js';
import { NavigationActions } from 'react-navigation';
import  StoriesActions from '../Stories/storiesActions.js';
import  SeriesActions from '../Series/seriesActions.js';
import  AuthorActions from '../Author/authorActions.js';

const mapStateToProps = (state) => {
  return {
    items:state.wallStore.items,
    isNetworkError:state.wallStore.isNetworkError,
    isSearchEnabled:state.wallStore.isSearchEnabled,
    isReachedEnd:state.wallStore.isReachedEnd,
    lastUpdatedAt:state.wallStore.lastUpdatedAt,
    lastTimeStamp:state.wallStore.lastTimeStamp,
    isSearchLoading:state.wallStore.isSearchLoading,
    noResultsFound:state.wallStore.noResultsFound,
    selectedStory:state.storiesStore.selectedStory,
    selectedSeries:state.seriesStore.selectedSeries,
    user:state.authStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItems:(score,lastTimeStamp,addMore)=> {
      const obj = Actions.getItems(score,lastTimeStamp,addMore);
      dispatch(obj);
    },
    searchItems:(searchString)=>{
      const obj = Actions.searchItems(searchString);
      dispatch(obj);
    },
    searchBegin:()=>{
      const obj = Actions.searchBegin();
      dispatch(obj);
    },
    searchCancel:()=>{
      const obj = Actions.searchCancel();
      dispatch(obj);
    },
    onSearchListScroll:()=>{
      const obj = Actions.onSearchListScroll();
      dispatch(obj);
    },
    openViewer:(storyItem)=>{

      if('story' === storyItem.type){
        dispatch(StoriesActions.clearSelectedState(storyItem))
      }else{
        dispatch(SeriesActions.clearSelectedState(storyItem))
      }
      dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: storyItem }));
    },
    openAuthor:(author) =>{
      dispatch(AuthorActions.clearAuthorState(author))
      dispatch(AuthorActions.authorDetailsSuccess(author))
      dispatch(NavigationActions.navigate({ routeName: 'Author', params: author }));
    },
    updateSocial:(storyItem) =>{
      const obj = Actions.updateSocial(storyItem);
      dispatch(obj);
    },
    openLogin:() =>{
      var params = {
        isLoginOptional:true
      }
      dispatch(NavigationActions.navigate({ routeName: 'Login', params:params }));
    }
  }
}

const WallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default WallContainer
