import { connect } from 'react-redux'
import View from './filter.js'
import  Actions from '../Stories/storiesActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
  return {
    filters: state.storiesStore.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilteredStories:(genre)=>{
      if(genre){
        const obj = Actions.getFilteredStories(genre);
        dispatch(obj);
      }else{
        const obj = Actions.fetchStories();
        dispatch(obj);
      }
    },
    getFilters:()=> {
      const obj = Actions.getFilters();
      dispatch(obj);
    },
    close:()=>{
      dispatch(NavigationActions.back());
    }
  }
}

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default FilterContainer
