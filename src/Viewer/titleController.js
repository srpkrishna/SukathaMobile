import { connect } from 'react-redux'
import TitleView from './titleView.js';


const mapStateToProps = (state,props) => {
  return {
    series:state.seriesStore.selectedSeries,
    story:state.storiesStore.selectedStory,
    title:props.title,
    isSeries:props.isSeries
  }
}

const Container = connect(
  mapStateToProps
)(TitleView)


export default Container
