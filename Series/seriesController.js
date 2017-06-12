import { connect } from 'react-redux'
import View from './seriesView'
import  Actions from './seriesActions';

const mapStateToProps = (state) => {
  return {
    seriesList: state.seriesList,
    reachedEnd:state.reachedEnd
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
    }
  }
}

const SeriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default SeriesContainer
