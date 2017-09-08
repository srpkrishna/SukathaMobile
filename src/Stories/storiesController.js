import { connect } from 'react-redux'
import View from './storiesView.js'
import  Actions from './storiesActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
  return {
    stories: state.storiesStore.stories,
    reachedEnd:state.storiesStore.reachedEnd,
    lastUpdatedAt:state.storiesStore.lastUpdatedAt,
    filter:state.storiesStore.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMoreStories:() => {
      const obj = Actions.getMoreStories();
      dispatch(obj);
    },
    getFilteredStories:(genre)=>{
      if(genre){
        const obj = Actions.getFilteredStories(genre);
        dispatch(obj);
      }else{
        const obj = Actions.fetchStories();
        dispatch(obj);
      }
    },
    getStories:()=> {
      const obj = Actions.fetchStories();
      dispatch(obj);
    },
    openViewer:(data) =>{
      dispatch(Actions.clearSelectedState(data))
      dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
    }
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default StoriesContainer
