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
    author:state.profileStore.author
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyDetails:(user) => {
      const obj = Actions.getMyDetails(user);
      dispatch(obj);
    },
    openViewer:(data,author,isStory) =>{

      if(isStory){
        dispatch(StoryActions.clearSelectedState(data));
        dispatch(StoryActions.storyDetailsSuccess(data));
        dispatch(StoryActions.storyAuthorDetailsSuccess(author));
        dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
      }else{
        dispatch(SeriesActions.clearSelectedState(data));
        dispatch(SeriesActions.seriesDetailsSuccess(data));
        dispatch(SeriesActions.seriesAuthorDetailsSuccess(author));
        dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
      }

    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)


export default Container
