import { connect } from 'react-redux';
import Viewer from '../Viewer/viewer.js';
import  Actions from '../Stories/storiesActions.js';
import  AuthorActions from '../Author/authorActions.js';
import { NavigationActions } from 'react-navigation';
import SendAnalytics from '../Utils/analytics';

const mapStateToProps = (state,props) => {

  return {
    content: state.storiesStore.selectedContent,
    story:state.storiesStore.selectedStory,
    author:state.storiesStore.selectedAuthor,
    authorLink:state.storiesStore.authorLink,
    comments:state.storiesStore.selectedStoryComments,
    shdShowMoreComments:state.storiesStore.shdShowMoreComments,
    user:state.authStore,
    params:props.params,
    isNetworkError:state.storiesStore.isNetworkError
  }
}

const mapDispatchToProps = (dispatch,state) => {
  return {
    updateSocial: (element,socialParams) => {
      const obj = Actions.updateSocial(element,socialParams);
      dispatch(obj);
    },
    showMoreComments:(story,lastTimeStamp) =>{
      const obj = Actions.getMoreComments(story,lastTimeStamp);
      dispatch(obj);
    },
    setStory:(data)=>{
      dispatch(Actions.clearSelectedState(data))
      dispatch(Actions.storyDetailsSuccess(data))
    },
    getStoryDetails:(authorId,timestamp) =>{
      dispatch(Actions.clearSelectedState({timestamp:timestamp,author:authorId}));
      const obj = Actions.getStoryDetails(authorId,timestamp);
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
      SendAnalytics.sendEvent('Story','openAuthor',data.penName);
      dispatch(AuthorActions.clearAuthorState(data))
      dispatch(AuthorActions.authorDetailsSuccess(data))
      dispatch(NavigationActions.navigate({ routeName: 'Author', params: data }));
    },
    openComment:(data) =>{
      dispatch(NavigationActions.navigate({ routeName: 'Comment', params: data }));
    },
    goBack:()=>{
      dispatch(NavigationActions.back());
    }

  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)

export default Container
