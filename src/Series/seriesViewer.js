import { connect } from 'react-redux';
import Viewer from '../Viewer/viewer.js';
import  Actions from '../Series/seriesActions.js';
import  AuthorActions from '../Author/authorActions.js';
import { NavigationActions } from 'react-navigation';
import SendAnalytics from '../Utils/analytics';

const mapStateToProps = (state,props) => {

  return {
    content: state.seriesStore.selectedContent,
    story:state.seriesStore.selectedSeries,
    author:state.seriesStore.selectedAuthor,
    authorLink:state.seriesStore.authorLink,
    comments:state.seriesStore.selectedSeriesComments,
    episode:state.seriesStore.selectedEpisode,
    shdShowMoreComments:state.seriesStore.shdShowMoreComments,
    user:state.authStore,
    params:props.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (element,authorId,timestamp,episode) => {
      const seriesId = {
        author:authorId,
        timestamp:timestamp,
        episode:episode
      }
      const obj = Actions.updateSocial(element,seriesId);
      dispatch(obj);
    },
    showMoreComments:(series,episodeNumber,lastTimeStamp) =>{
      const obj = Actions.getMoreComments(series,episodeNumber,lastTimeStamp);
      dispatch(obj);
    },
    getEpisodeContent(authorId,name,episode){
       const obj = Actions.getSeriesContent(authorId,name,episode);
       dispatch(obj);
    },
    setStory:(data,episode)=>{
      dispatch(Actions.clearSelectedState(data,episode))
      dispatch(Actions.seriesDetailsSuccess(data,episode))
    },
    getStoryDetails:(authorId,timestamp,episode) =>{
      dispatch(Actions.clearSelectedState({timestamp:timestamp,author:authorId},episode));
      const obj = Actions.getSeriesDetails(authorId,timestamp,episode);
      dispatch(obj);
    },
    getStoryContent:(authorId,name,episode) =>{
      const obj = Actions.getSeriesContent(authorId,name,episode);
      dispatch(obj);
    },
    getAuthorDetails:(authorId) =>{
      const obj = Actions.getAuthorDetails(authorId);
      dispatch(obj);
    },
    getComments:(authorId,timestamp,episode) =>{
      const obj = Actions.getComments(authorId,timestamp,episode);
      dispatch(obj);
    },
    openAuthor:(data) =>{
      SendAnalytics.sendEvent('Series','openAuthor',data.penName);
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
