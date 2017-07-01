import { connect } from 'react-redux';
import Viewer from '../Viewer/viewer.js';
import  Actions from '../Stories/storiesActions.js';
import  AuthorActions from '../Author/authorActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {

  return {
    content: state.storiesStore.selectedContent,
    story:state.storiesStore.selectedStory,
    author:state.storiesStore.selectedAuthor,
    authorLink:state.storiesStore.authorLink,
    comments:state.storiesStore.selectedStoryComments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (element) => {
      const obj = Actions.updateSocial(element);
      dispatch(obj);
    },
    showMoreComments:(story,lastTimeStamp) =>{
      const obj = Actions.getMoreComments(story,lastTimeStamp);
      dispatch(obj);
    },
    getStoryDetails:() =>{
      const obj = Actions.getStoryDetails();
      dispatch(obj);
    },
    getStoryContent:(authorId,name) =>{
      const obj = Actions.getStoryContent(authorId,name);
      dispatch(obj);
    },
    getAuthorDetails:(authorId) =>{
      const obj = Actions.getAuthorDetails(authorId);
      dispatch(obj);
    },
    getComments:(authorId,timestamp) =>{
      const obj = Actions.getComments(authorId,timestamp);
      dispatch(obj);
    },
    openAuthor:(data) =>{
      dispatch(AuthorActions.clearAuthorState(data))
      dispatch(AuthorActions.authorDetailsSuccess(data))
      dispatch(NavigationActions.navigate({ routeName: 'Author', params: data }));
    },
    openComment:(data) =>{
      dispatch(NavigationActions.navigate({ routeName: 'Comment', params: data }));
    }

  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)

export default Container
