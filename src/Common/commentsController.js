import { connect } from 'react-redux'
import Comment from './commentBox.js';
import { NavigationActions } from 'react-navigation';
import  SeriesActions from '../Series/seriesActions.js';
import StoryActions from '../Stories/storiesActions.js';

const mapStateToProps = (state) => {
  return {
    user:state.authStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    publishComment:(comment,story,author,episode) =>{
      if(episode){
        dispatch(SeriesActions.publishComment(comment,story,author,episode));
      }else{
        dispatch(StoryActions.publishComment(comment,story,author));
      }

      dispatch(NavigationActions.back());
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)


export default Container
