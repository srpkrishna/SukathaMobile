import { connect } from 'react-redux'
import View from './seriesView.js'
import  Actions from './seriesActions.js';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => {
  return {
    seriesList: state.seriesStore.seriesList,
    reachedEnd:state.seriesStore.reachedEnd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMoreSeries:() => {
      const obj = Actions.getMoreSeries();
      dispatch(obj);
    },
    getSeriesList:() => {
      const obj = Actions.fetchSeriesList();
      dispatch(obj);
    },
    openViewer:(data) =>{
      dispatch(Actions.clearSelectedState(data))
      dispatch(Actions.seriesDetailsSuccess(data))
      dispatch(NavigationActions.navigate({ routeName: 'Viewer', params: data }));
    }
  }
}

const SeriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default SeriesContainer
