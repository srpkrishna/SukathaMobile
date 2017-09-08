import { connect } from 'react-redux'
import Profile from './profile.js';
import  Actions from './profileActions.js';
import { NavigationActions } from 'react-navigation';
import  SeriesActions from '../Series/seriesActions.js';
import StoryActions from '../Stories/storiesActions.js';

const mapStateToProps = (state) => {
  return {
    user:state.authStore,
    stories:state.profileStore.stories,
    seriesList:state.profileStore.seriesList,
    author:state.profileStore.author,
    isAuthor:state.profileStore.isAuthor,
    isDataLoaded:state.profileStore.isDataLoaded,
    isLoggedInCancelled:state.nav.isCancelled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyDetails:(user) => {
      const obj = Actions.getMyDetails(user);
      dispatch(obj);
    },
    clearProfile:() =>{
      const obj = Actions.clearProfile();
      dispatch(obj);
    },
    openViewer:(data,author,isStory) =>{

      if(isStory){
        dispatch(StoryActions.clearSelectedState(data));
        dispatch(StoryActions.storyDetailsSuccess(data));
        dispatch(StoryActions.storyAuthorDetailsSuccess(author));
        dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
      }else{
        var episode = data.episodes.length
        dispatch(SeriesActions.clearSelectedState(data,episode));
        dispatch(SeriesActions.seriesDetailsSuccess(data,episode));
        dispatch(SeriesActions.seriesAuthorDetailsSuccess(author));
        dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
      }
    },
    openLogin(){
      dispatch(NavigationActions.navigate({ routeName: 'Login'}));
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)


export default Container
