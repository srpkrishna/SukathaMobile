import { connect } from 'react-redux'
import View from './filterTitle.js'
import  Actions from '../Stories/storiesActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
  return {
    filter: state.storiesStore.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openFilters:(filter)=>{
      dispatch(NavigationActions.navigate({ routeName: 'Filter', params: filter }));
    }
  }
}

const FilterTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default FilterTitleContainer
