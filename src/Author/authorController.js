import { connect } from 'react-redux'
import Author from './author.js';
import  Actions from './authorActions.js';
import { NavigationActions } from 'react-navigation';
import  SeriesActions from '../Series/seriesActions.js';
import StoryActions from '../Stories/storiesActions.js';

const mapStateToProps = (state) => {
  return {
    stories:state.authorStore.stories,
    seriesList:state.authorStore.seriesList,
    author:state.authorStore.author
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthorDetails:(authorId) => {
      const obj = Actions.getAuthorDetails(authorId);
      dispatch(obj);
    },
    getAuthorStories:(authorId) => {
      const obj = Actions.getAuthorStories(authorId);
      dispatch(obj);
    },
    getAuthorSeries:(authorId) => {
      const obj = Actions.getAuthorSeries(authorId);
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
)(Author)


export default Container
