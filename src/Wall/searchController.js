import { connect } from 'react-redux'
import View from './searchView.js'
import  Actions from './wallActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
  return {
    searchListScrolled:state.wallStore.searchListScrolled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchItems:(searchString)=>{
      const obj = Actions.searchItems(searchString);
      dispatch(obj);
    },
    searchBegin:()=>{
      const obj = Actions.searchBegin();
      dispatch(obj);
    },
    searchCancel:()=>{
      const obj = Actions.searchCancel();
      dispatch(obj);
    }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default SearchContainer
