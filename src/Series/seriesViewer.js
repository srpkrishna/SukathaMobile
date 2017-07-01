import { connect } from 'react-redux';
import Viewer from '../Viewer/viewer.js';
import  Actions from '../Series/seriesActions.js';
import  AuthorActions from '../Author/authorActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {

  return {
    content: state.seriesStore.selectedContent,
    story:state.seriesStore.selectedSeries,
    author:state.seriesStore.selectedAuthor,
    authorLink:state.seriesStore.authorLink,
    comments:state.seriesStore.selectedSeriesComments,
    episode:state.seriesStore.selectedEpisode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSocial: (element) => {
      const obj = Actions.updateSocial(element);
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
    getStoryDetails:() =>{
      const obj = Actions.getSeriesDetails();
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
