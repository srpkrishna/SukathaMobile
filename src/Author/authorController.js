import { connect } from 'react-redux'
import Author from './author.js';
import  Actions from './authorActions.js';
import { NavigationActions } from 'react-navigation';
import  SeriesActions from '../Series/seriesActions.js';
import StoryActions from '../Stories/storiesActions.js';

const mapStateToProps = (state,props) => {
  return {
    stories:state.authorStore.stories,
    seriesList:state.authorStore.seriesList,
    author:state.authorStore.author,
    params:props.navigation.state.params
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
      }else{
        var episode = data.episodes.length
        dispatch(SeriesActions.clearSelectedState(data,episode));
        dispatch(SeriesActions.seriesDetailsSuccess(data,episode));
        dispatch(SeriesActions.seriesAuthorDetailsSuccess(author));
      }
      
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'Viewer', params: data})
        ]
      })
      dispatch(resetAction)
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Author)


export default Container
