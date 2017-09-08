import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ListView ,AppState} from 'react-native';
import Item from '../Common/item.js';
import SendAnalytics from '../Utils/analytics';

export default class SeriesView extends Component {

  getState(props){

    var isLoading = true;
    var seriesList;
    if(props.seriesList && props.seriesList.length >0 ){
      var data = Object.assign([], props.seriesList);
      if(!props.reachedEnd){
        data.push(-1)
      }
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      isLoading = false;
      seriesList = ds.cloneWithRows(data);
    }

    return {
      isLoading: isLoading,
      seriesList:seriesList
    }
  }
  constructor(props) {
    super(props);
    this.state = this.getState(props)
  }

  componentDidMount() {
    if(!this.state.seriesList){
      this.props.getSeriesList()
    }
    AppState.addEventListener('change', this.handleAppStateChange);
    SendAnalytics.sendPageView("Series","/home/series")
  }

  componentWillReceiveProps(nextProps){
    var state = this.getState(nextProps)
    this.setState(state)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && this.props.lastUpdatedAt) {
      var currentDate = new Date()
      var diff = Math.abs(currentDate.getTime() - this.props.lastUpdatedAt) / 3600000;
      if(diff > 2){
        this.props.getSeriesList();
      }
    }
  }

  renderRow(rowData, sectionID, rowID) {
    if(rowData === -1){
      return(
        <View style={{flex: 1, paddingTop:10}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
        <Item data={rowData} index={rowID} onPress={this.onPressRow.bind(this)} />
      );
  }

  onPressRow(index){
    var rowData = this.state.seriesList.getRowData(0,index);
    this.props.openViewer(rowData);
  }

  fetchMore(){
    this.props.showMoreSeries();
    SendAnalytics.sendEvent('Series','showMoreSeries','');
  }

  render() {
    if (!this.state.seriesList) {
      return (
        <View style={{flex: 1, paddingTop: 10}}>
          <ActivityIndicator />
        </View>
      );
    }else{
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.seriesList}
            renderHeader = {() => <View style={{height:2}} />}
            renderFooter= {() => <View style={{height:10}} />}
            renderRow={this.renderRow.bind(this)}
            onEndReached={this.fetchMore.bind(this)}
            onEndReachedThreshold={150}
            initialListSize={2}
          />
        </View>

      );
    }
  }
}
