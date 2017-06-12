import { connect } from 'react-redux'
import View from './storiesView.js'
import  Actions from './storiesActions.js';

const mapStateToProps = (state) => {
  return {
    stories: state.stories,
    reachedEnd:state.reachedEnd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMoreStories:() => {
      const obj = Actions.getMoreStories();
      dispatch(obj);
    },
    getStories:()=> {
      const obj = Actions.fetchStories();
      dispatch(obj);
    }
  }
}

const StoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default StoriesContainer
